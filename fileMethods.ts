import {FileDataDto} from "./FileDataDto";

const fs = require('fs');
import {Response} from 'express';

const DEFAULT_PATH = "./uploads/";

module.exports.checkFileExists = function (fileName: string) {
    try {
        fs.accessSync(getFullPath(fileName), fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }

};

module.exports.createFile = function (dto: FileDataDto, res: Response) {
    fs.writeFile(getFullPath(dto.fullName()), dto.content, () => {
        response(res, `File ${dto.fullName()} created`);
    })
};

module.exports.readFile = function (dto: FileDataDto, res: Response) {
    fs.readFile(getFullPath(dto.fullName()), 'utf8', (err: Error, data: string) => {
        response(res, `File ${dto.fullName()} content is:\n${data}`);
    });
};

module.exports.updateFile = function (dto: FileDataDto, res: Response) {
    fs.writeFile(getFullPath(dto.fullName()), dto.content, () => {
        response(res, `File ${dto.fullName()} was updated`);
    })
};

module.exports.deleteFile = function (dto: FileDataDto, res: Response) {
    fs.unlink(getFullPath(dto.fullName()), () => {
        response(res, `File ${dto.fullName()} was deleted`);
    })
};

const response = function (res: Response, text: string) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(text);
}

const getFullPath = function (name: string) {
    return DEFAULT_PATH + name;
}