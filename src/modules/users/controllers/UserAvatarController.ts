import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { instanceToInstance } from 'class-transformer'//para excluir a senha do retorno


class UserAvatarController {
    public async update(request:Request,response:Response):Promise<Response>{
        const updateAvatar = new UpdateUserAvatarService()
        const user = await updateAvatar.execute({
            userId:request.user.id,
            avatarFileName: request.file!.filename
        })
        return response.json(instanceToInstance(user));
    }
}

export default UserAvatarController;