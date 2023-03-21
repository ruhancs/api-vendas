import fs from 'fs';
import path from 'path';
import upload from '../../../config/upload';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';// verificar o tipo do arquivo

class S3StorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            accessKeyId: process.env.AWS_ACCES_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
            region: 'us-east-1',
        })
    }

    public async saveFile(file:string): Promise<string>{
        // caminho onde o arquivo esta temporariamente armazenado
        const originalPath = path.resolve(upload.tmpFolder, file);

        const ContentType = mime.getType(originalPath);

        if(!ContentType) {
            throw new Error('File not found');
        }

        // pegar o arquivo
        const fileContent = await fs.promises.readFile(originalPath);

        // enviar arquivo para aws
        await this.client.putObject({
            Bucket: upload.config.aws.bucket,//nome da bucket
            Key: file, // nome que o arquivo sera salvo
            ACL: 'public-read',//permisao de leitura publica
            Body: fileContent,// arquivo
            ContentType: ContentType,
        }).promise()//transforma em promise para usar o await

        // apagar o arquivo da pasta temporaria
        await fs.promises.unlink(originalPath);

        return file;
    }
    
    public async deleteFile(file:string): Promise<void>{
        // deletar o arquivo da bucket
        await this.client.deleteObject({
            Bucket: upload.config.aws.bucket,//nome da bucket
            Key: file,
        }).promise();
    }

}

export default S3StorageProvider;