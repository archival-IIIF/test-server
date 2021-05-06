import * as Router from 'koa-router';
import Ajv from 'ajv';
import * as fs from 'fs';
import * as http from 'http';
import {ErrorObject} from "ajv";

const router: Router = new Router();

router.get('/validate', async ctx => {
    const manifestUrl = ctx.request.query.manifest as string;
    ctx.body = await validateUrl(manifestUrl);
});

interface IResult {
    [key: string]: Array<ErrorObject> | string;
}

async function validateUrl(manifestUrl?: string, result?: IResult) {

    if (!result) {
        result = {};
    }

    if (!manifestUrl) {
        result['-'] = 'Missing url';
        return result;
    }

    if (manifestUrl === '') {
        result['-'] = 'Empty url';
        return result;
    }

    if (!manifestUrl || !isUrl(manifestUrl)) {
        result['-'] = 'Invalid url';
        return result;
    }

    try {
        let manifestData = await new Promise((resolve, reject) => {
            http.get(manifestUrl, (response) => {
                let chunksOfData: any = [];

                response.on('data', (fragments) => {
                    chunksOfData.push(fragments);
                });

                response.on('end', () => {
                    let response_body = Buffer.concat(chunksOfData);

                    // promise resolved on success
                    resolve(response_body.toString());
                });

                response.on('error', (error) => {
                    // promise rejected on error
                    reject(error);
                });
            });
        });


        const rawdata = fs.readFileSync(__dirname + '/iiif_3_0.json');
        const schema = JSON.parse(rawdata.toString());
        const data: any = JSON.parse(manifestData.toString());

        const ajv = new Ajv({logger: false});

        ajv.validate(schema, data);
        let errors = ajv.errors;

        if (errors) {
            result[manifestUrl] = errors;
        } else {
            result[manifestUrl] = 'Validation successful';
        }

        if (data.hasOwnProperty('items')) {
            for (const item of data.items) {
                if (result.hasOwnProperty(item.id)) {
                    result[item.id] = 'Loop';
                    continue;
                }
                if (item.type !== 'Manifest' && item.type !== 'Collection') {
                    continue;
                }
                const childResult = await validateUrl(item.id, result);
                result = Object.assign(result, childResult);
            }
        }

        return result;
    } catch (e) {
        result[manifestUrl] = e.message;
        return result;
    }
}


function isUrl(input: string) {
    let url;

    try {
        url = new URL(input);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default router.routes();
