import nodemailer from 'nodemailer';
import MailTemplate from './MailTemplate';

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

class EtherealMail {
    static async sendMail({ to,from, subject, templateData }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const mailTemplate = new MailTemplate()

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            },
        });
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe venda',
                address: from?.email || 'equipe@apivendas.com.br',
            },
            to: {
                name: to.name,
                address: to.email,                
            },
            subject: subject,
            html: await mailTemplate.parser(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        // link do email no console
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export default EtherealMail;