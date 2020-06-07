import { Injectable } from "@nestjs/common";

const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {

    public transporter: any;

    public constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'gseteapi@gmail.com',
              pass: 'geracaosete' 
            }
        });
    }

    public sendMail(message: string, recipient: string) {
        const mailOptions = {
            from: 'gseteapi@gmail.com',
            to: `${recipient}`,
            subject: 'Cofirmação de conta',
            html: `${message}`
        }
          
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }

    public verifyUser(name: string, recipient: string, code: string)  {
        const mailOptions = {
            from: 'gseteapi@gmail.com',
            to: `${recipient}`,
            subject: 'Cofirmação de conta',
            html: `<p>Olá ${name}, utlize o seguinte código para concluir seu cadastro: ${code}<p>`
        }
          
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }
}