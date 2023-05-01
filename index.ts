import {FileDataDto} from "./FileDataDto";
const {checkFileExists, createFile, readFile, updateFile, deleteFile} = require('./fileMethods');

const CODE_FILE_ALREADY_EXISTS = "File already exists";
const CODE_FILE_DOESNT_EXISTS = "File doesnt exists";

const express = require('express');
const app = express();

const fileError = function (res: any, error: string) {
   res.statusCode = 400;
   res.setHeader('Content-Type', 'text/plain');
   res.end(error);
}
const badRequest = function (res: any) {
   res.statusCode = 400;
   res.setHeader('Content-Type', 'text/plain');
   res.end("Bad Request");
};

const read = function (createDataDto: FileDataDto, res: any) {
   if (!checkFileExists(createDataDto.fullName())) {
      fileError(res, CODE_FILE_DOESNT_EXISTS);
      return;
   }
   readFile(createDataDto, res);

};

const create = function (createDataDto: FileDataDto, res: any) {
   if (checkFileExists(createDataDto.fullName())) {
      fileError(res, CODE_FILE_ALREADY_EXISTS);
      return;
   }
   createFile(createDataDto, res);
};

const update = function (createDataDto: FileDataDto, res: any) {

   if (!checkFileExists(createDataDto.fullName())) {
      fileError(res, CODE_FILE_DOESNT_EXISTS);
      return;
   }
   updateFile(createDataDto, res);

};

const destroy = function (createDataDto: FileDataDto, res: any) {
   if (!checkFileExists(createDataDto.fullName())) {
      fileError(res, CODE_FILE_DOESNT_EXISTS);
      return;
   }
   deleteFile(createDataDto, res);
};

const readBody = function (req: any, res: any, fun: Function) {
   let body = '';

   req.on('data', (chunk: any) => {
      body += chunk;
   });

   req.on('end', () => {
      try {
         let {name, content, extension} = JSON.parse(body);
         let createDataDto = new FileDataDto(name, content, extension);
         fun(createDataDto, res);
      } catch (error) {
         badRequest(res)
      }
   });
}


app.post('/read', function (req: any, res: any) {
   readBody(req, res, read);
});

app.post('/create', function (req: any, res: any) {
   readBody(req, res, create);
})

app.post('/update', function (req: any, res: any) {
   readBody(req, res, update);
})

app.post('/delete', function (req: any, res: any) {
   readBody(req, res, destroy);
})


app.listen(3000);