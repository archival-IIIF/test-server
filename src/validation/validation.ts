import * as Router from 'koa-router';
import * as Ajv from 'ajv';
import * as fs from 'fs';
import * as http from 'http';

const router: Router = new Router();

router.get('/validate', async ctx => {

    const manifestUrl = ctx.request.query.manifest;
    if (!manifestUrl || !isUrl(manifestUrl)) {
        ctx.status = 400;
        ctx.body = 'Wrong input';
    }

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

    const ajv = new Ajv({logger: false});

    ajv.validate(schema, JSON.parse(manifestData.toString())); // true
    const errors = ajv.errors; // true

    if (errors) {
        ctx.body = errors;
    } else {
        ctx.body = 'Validation successful';
    }
});

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
