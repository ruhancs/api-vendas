import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import { isAfter, addHours } from 'date-fns';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import { hash } from "bcryptjs";


interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({token,password}:IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);
        
        const userToken = await userTokenRepository.findByToken(token);      
        if(!userToken) {
            throw new AppError('Token does not exist');
        }
        
        const user = await userRepository.findById(userToken.user_id);
        if(!user) {
            throw new AppError('User does not exist');
        }

        // verificar o tempo de validade do token
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt,2)//add 2 horas para a validade do token
        if(isAfter(Date.now(), compareDate)) {//verificar se o tempo ja acabou
            throw new AppError('Token expired');
        }

        user.password = await hash(password,8);
        await userRepository.save(user);

    }
}

export default ResetPasswordService;