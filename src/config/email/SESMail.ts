import nodemailer from 'nodemailer';
import MailTemplate from './MailTemplate';
import aws from 'aws-sdk';
import mailConfig from './mail';

interface IMailContact {
    name:string;
    email:string;
}

interface ITemplateVariable {
    [key: string] : string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

class SESMail {
    static async sendMail({ to,from, subject, templateData }: ISendMail): Promise<void> {
        const mailTemplate = new MailTemplate()

        const transporter = nodemailer.createTransport({
            SES: new aws.SES({//serviço de email aws
                apiVersion: '2010-12-01',
            })
        });

        const { email, name } = mailConfig.defaults.from;

        const message = await transporter.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email,                
            },
            subject: subject,
            html: await mailTemplate.parser(templateData),
        });
    }
}

export default SESMail;