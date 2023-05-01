const fs = require('fs');

const DEFAULT_PATH = "./uploads/";

module.exports.checkFileExists = function (fileName: string) {
    try {
        fs.accessSync(getFullPath(fileName), fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }

};

module.exports.createFile = function (dto: any, res: any) {
    fs.writeFile(getFullPath(dto.fullName()), dto.content, () => {
        response(res, `File ${dto.fullName()} created`);
    })
};

module.exports.readFile = function (dto: any, res: any) {
    fs.readFile(getFullPath(dto.fullName()), 'utf8', (err: any, data: any) => {
        response(res, `File ${dto.fullName()} content is:\n${data}`);
    });
};

module.exports.updateFile = function (dto: any, res: any) {
    fs.writeFile(getFullPath(dto.fullName()), dto.content, () => {
        response(res, `File ${dto.fullName()} was updated`);
    })
};

module.exports.deleteFile = function (dto: any, res: any) {
    fs.unlink(getFullPath(dto.fullName()), () => {
        response(res, `File ${dto.fullName()} was deleted`);
    })
};

const response = function (res: any, text: any) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(text);
}

const getFullPath = function (name: any) {
    return DEFAULT_PATH + name;
}