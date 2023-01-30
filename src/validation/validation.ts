import Router from 'koa-router';
import Ajv from 'ajv/dist/2020';
import * as fs from 'fs';
import * as http from 'http';
import {ErrorObject} from "ajv";
import addFormats from "ajv-formats"

const router: Router = new Router();

router.get('/validate', async ctx => {
    const manifestUrl = ctx.request.query.manifest as string;
    ctx.body = await validateUrl(manifestUrl);
});

interface IResult {
    [key: string]: Array<ErrorObject> | string;
}

async function validateUrl(manifestUrl?: string, result?: IResult) {

    let result2 = result ?? {};

    if (!manifestUrl) {
        result2['-'] = 'Missing url';
        return result2;
    }

    if (manifestUrl === '') {
        result2['-'] = 'Empty url';
        return result2;
    }

    if (!manifestUrl || !isUrl(manifestUrl)) {
        result2['-'] = 'Invalid url';
        return result2;
    }

    try {
        let manifestData: any = await new Promise((resolve, reject) => {
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

        const ajv = new Ajv();
        addFormats(ajv);

        ajv.validate(schema, data);
        let errors = ajv.errors;

        if (errors) {
            result2[manifestUrl] = errors;
        } else {
            result2[manifestUrl] = 'Validation successful';
        }

        if (data.hasOwnProperty('items')) {
            for (const item of data.items) {
                if (result2.hasOwnProperty(item.id)) {
                    result2[item.id] = 'Loop';
                    continue;
                }
                if (item.type !== 'Manifest' && item.type !== 'Collection') {
                    continue;
                }
                const childResult: any = await validateUrl(item.id, result2);
                result2 = Object.assign(result2, childResult);
            }
        }

        return result2;
    } catch (e: any) {
        result2[manifestUrl] = e.message;
        return result2;
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
