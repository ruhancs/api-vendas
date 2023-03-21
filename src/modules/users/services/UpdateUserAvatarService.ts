import path from "path";
import fs from 'fs'
import { getCustomRepository } from "typeorm";
import upload from "../../../config/upload";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import DiskStorageProvider from "../../../shared/providers/storageProvider/DiskStorageProvider";
import S3StorageProvider from "../../../shared/providers/storageProvider/S3StorageProvider";


interface IRequest {
    userId: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    public async execute({ avatarFileName, userId }:IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const user =await userRepository.findById(userId);
        if(!user) {
            throw new AppError('User not found');
        }
        
        if (upload.driver === 's3') {
            const s3StorageProvider = new S3StorageProvider()

            if(user.avatar) {
                // apagar a imagem que existe para inserir a nova
                await s3StorageProvider.deleteFile(user.avatar);
            }
    
            // aramzenar a nova imagem na pasta e retorna o nome da imagem
            const filename = await s3StorageProvider.saveFile(avatarFileName);
            user.avatar = filename;
        } else {
            const storageProvider = new DiskStorageProvider();
            
            if(user.avatar) {
                // apagar a imagem que existe para inserir a nova
                await storageProvider.deleteFile(user.avatar);
            }
    
            // aramzenar a nova imagem na pasta e retorna o nome da imagem
            const filename = await storageProvider.saveFile(avatarFileName);
            user.avatar = filename;
        }

        await userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;