interface IMailConfig {
    driver: 'ethereal' | 'ses';// provedores de email
    defaults: {
        from: {//da onde o email partira
            email: string;
            name: string;
        }
    } 
}

export default { 
    driver: process.env.MAIL_DRIVER || 'ethereal',//ethereal em dev, ses da aws em prod
    defaults: {
        from: {
            email: 'equipe@apivendas.com.br',//em dev fake, em prod endereço fornecido pelo ses
            name: 'Ruhan',
        },
    },
} as IMailConfig;