const fs = require('fs');
import * as path from 'path';
const {promisify} = require('util');

const readdirAsync = promisify(fs.readdir);

const fileIconsPath = path.join(__dirname, '../../node_modules/file-icon-vectors/dist/icons/vivid');

const iconsByExtension: string[] = [];
readdirAsync(fileIconsPath).then((files: string[]) => {
    iconsByExtension.push(...files.map((file: string) => path.basename(file, '.svg')));
});

module.exports = {fileIconsPath, iconsByExtension};
