import Router from '@koa/router';
import Ajv from 'ajv/dist/2020';
import * as fs from 'node:fs';
import * as http from 'node:http';
import type {ErrorObject} from "ajv";
import addFormats from "ajv-formats"
import getBaseUrl from "../lib/BaseUrl";

const config = require('../lib/Config');

const router = new Router();

// Limits that keep /validate cheap, even for large or deeply nested test cases.
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024;
const MAX_DEPTH = 5;
const MAX_REQUESTS = 50;

router.get('/validate', async ctx => {
    const manifestUrl = ctx.request.query.manifest;
    const baseUrl = new URL(getBaseUrl(ctx));
    ctx.body = await validateUrl(
        typeof manifestUrl === 'string' ? manifestUrl : undefined,
        {},
        {requests: 0, baseUrl},
        0
    );
});

interface IResult {
    [key: string]: Array<ErrorObject> | string;
}

interface IState {
    requests: number;
    baseUrl: URL;
}

class ValidationError extends Error {}

let schema: unknown;
function getSchema() {
    if (!schema) {
        schema = JSON.parse(fs.readFileSync(__dirname + '/iiif_3_0.json').toString());
    }
    return schema as object;
}

/**
 * Only manifests of this server can be validated. They are fetched directly from the
 * local process, so /validate never sends requests to other hosts.
 */
function isOwnUrl(url: URL, baseUrl: URL): boolean {
    return url.origin === baseUrl.origin;
}

function fetchOwnUrl(url: URL, baseUrl: URL): Promise<string> {
    return new Promise((resolve, reject) => {
        const request = http.get({
            host: '127.0.0.1',
            port: config.port,
            path: url.pathname + url.search,
            timeout: REQUEST_TIMEOUT_MS,
            // Pass the public host on, so ids in the returned manifests keep the public base URL.
            headers: {
                host: baseUrl.host,
                'x-forwarded-host': baseUrl.host,
                'x-forwarded-proto': baseUrl.protocol.replace(':', ''),
            },
        }, (response) => {
            if (response.statusCode && response.statusCode >= 400) {
                response.resume();
                return reject(new ValidationError('HTTP status ' + response.statusCode));
            }

            const chunks: Buffer[] = [];
            let size = 0;
            response.on('data', (chunk: Buffer) => {
                size += chunk.length;
                if (size > MAX_RESPONSE_BYTES) {
                    request.destroy(new ValidationError('Response too large'));
                    return;
                }
                chunks.push(chunk);
            });
            response.on('end', () => resolve(Buffer.concat(chunks).toString()));
            response.on('error', reject);
        });

        request.on('timeout', () => request.destroy(new ValidationError('Timeout')));
        request.on('error', reject);
    });
}

async function validateUrl(manifestUrl: string | undefined, result: IResult, state: IState, depth: number): Promise<IResult> {

    if (!manifestUrl) {
        result['-'] = 'Missing url';
        return result;
    }

    const url = parseUrl(manifestUrl);
    if (!url) {
        result[manifestUrl] = 'Invalid url';
        return result;
    }

    if (!isOwnUrl(url, state.baseUrl)) {
        result[manifestUrl] = 'Only manifests of this server can be validated';
        return result;
    }

    if (depth > MAX_DEPTH) {
        result[manifestUrl] = 'Maximum nesting depth reached';
        return result;
    }

    if (state.requests >= MAX_REQUESTS) {
        result[manifestUrl] = 'Maximum number of requests reached';
        return result;
    }
    state.requests++;

    let data: any;
    try {
        data = JSON.parse(await fetchOwnUrl(url, state.baseUrl));
    } catch (e: unknown) {
        if (e instanceof ValidationError) {
            result[manifestUrl] = e.message;
        } else if (e instanceof SyntaxError) {
            result[manifestUrl] = 'Invalid JSON';
        } else {
            result[manifestUrl] = 'Could not load url';
        }
        return result;
    }

    const ajv = new Ajv({logger: false});
    addFormats(ajv);
    ajv.validate(getSchema(), data);
    result[manifestUrl] = ajv.errors ?? 'Validation successful';

    if (data && Array.isArray(data.items)) {
        for (const item of data.items) {
            if (!item || typeof item.id !== 'string') {
                continue;
            }
            if (item.type !== 'Manifest' && item.type !== 'Collection') {
                continue;
            }
            if (Object.hasOwn(result, item.id)) {
                result[item.id] = 'Loop';
                continue;
            }
            await validateUrl(item.id, result, state, depth + 1);
        }
    }

    return result;
}

function parseUrl(input: string): URL | undefined {
    try {
        const url = new URL(input);
        if (url.protocol === "http:" || url.protocol === "https:") {
            return url;
        }
    } catch (_) {
        // invalid url
    }
    return undefined;
}

export default router.routes();
