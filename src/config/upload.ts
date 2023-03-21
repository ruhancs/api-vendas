import multer, { StorageEngine } from "multer";
import path from "path";
import crypto from 'crypto';

interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    director: string;
    multer: {
        storage: StorageEngine;
    };
    config: {
        aws: {
            bucket: string;
        };
    }
}

const uploadFolder = path.resolve(__dirname,'..','..','uploads');//caminho da pasta 
// pasta que armazenara os arquivos temporariamente
const tmpFolder = path.resolve(__dirname,'..','..','temp');//caminho da pasta 

export default {
    driver: process.env.STORAGE_DRIVER,
    director: uploadFolder,
    tmpFolder,
    multer: {
        storage: multer.diskStorage({//armazenar em disco no servidor
            destination:tmpFolder,//primeiro passa para pasta temp depois move para uploads ou s3
            filename(request,file,callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;
                callback(null, filename);//definir o nome do arquivo
            }
        })
    },
    config : {
        aws: {
            bucket: 'upload-user-avatar',
        }
    }
} as IUploadConfig