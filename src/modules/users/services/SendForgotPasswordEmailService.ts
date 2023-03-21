import path from "path";
import { getCustomRepository } from "typeorm";
import EtherealMail from "../../../config/email/EtherealMail";
import AppError from "../../../shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import SESMail from "../../../config/email/SESMail";
import mailConfig from '../../../config/email/mail';

interface IRequest {
    email: string;}

class SendForgotPasswordEmailService {
    public async execute({email}:IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);
        const user = await userRepository.findByEmail(email);
        if(!user) {
            throw new AppError('User email does not exist');
        };

        const {token} = await  userTokenRepository.generate(user.id);

        const forgotPasswodTemplate = path.resolve(__dirname,'..','views','forgot_password.hbs');


        if (mailConfig.driver === 'ses'){//envio de email via SES aws
            await SESMail.sendMail({
                to: {
                    name:user.name,
                    email:user.email
                },
                subject:'[API Vendas] Recuperaçao de senha',
                templateData: {
                    file: forgotPasswodTemplate,
                    variables: {
                        name:user.name,
                        link: `http://localhost:3000/reset_password?token=${token}`,
                    }
                }
            })
            return;
        } 

        await EtherealMail.sendMail({
            to: {
                name:user.name,
                email:user.email
            },
            subject:'[API Vendas] Recuperaçao de senha',
            templateData: {
                file: forgotPasswodTemplate,
                variables: {
                    name:user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                }
            }
        })
    }
}

export default SendForgotPasswordEmailService;