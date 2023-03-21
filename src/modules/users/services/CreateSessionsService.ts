import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../../config/auth";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token:string;
}

class CreateSessionsService {
    public async execute({email,password}:IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Incorrect email or password',401);
        }        
        const validatePassword = await compare(password,user.password);
        if (!validatePassword) {
            throw new AppError('Incorrect email or password',401);
        }

        const token = sign({},auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn,
        });

        return {
            user,
            token
        };
    }
}

export default CreateSessionsService;