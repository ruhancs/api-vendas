import fs from 'fs';
import path from 'path';
import upload from '../../../config/upload';

class DiskStorageProvider {
    public async saveFile(file:string): Promise<string>{
        await fs.promises.rename(
            path.resolve(upload.tmpFolder, file),
            path.resolve(upload.director, file),
        );//mover da pasta temp para pasta uploads

        return file;
    }
    
    public async deleteFile(file:string): Promise<void>{
        const filePath = path.resolve(upload.director, file);//caminho completo do arquivo file é o nome
        try {
            await fs.promises.stat(filePath);//verificar se o arquivo existe
        } catch(err) {
            console.log(err);
            return;
        }

        await fs.promises.unlink(filePath)//apagar o arquivo
    }

}

export default DiskStorageProvider;