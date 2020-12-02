import { Injectable } from "@nestjs/common";

import * as ejs from 'ejs';
const nodemailer = require ("nodemailer"); 
const { google } = require("googleapis"); 

const CLIENT_ID = '189708702352-qu5lpcs8s2099mb9n7980kevapfr0kds.apps.googleusercontent.com';
const CLIENT_SECRET = '-2HmnY8ylUwM1b-sGu69LVoW';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Y6A9lpJCycxCgYIARAAGAQSNwF-L9IrzxTdgG4MSdjhXA8T3c6RJGqZnlZtmFTcSYFUWlj0g_kxdbhCD10zxpjbSMJXbQy7KDs';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril', 
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outrubo', 
  'Novembro',
  'Dezembro'
];

const dateFormat = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day} de ${MONTHS[month]} de ${year}`;
}

@Injectable()
export class EmailService {

  public transporter: any;

  public constructor() { }

  public async authenticate() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'samuelgsete@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken 
        }
      });
    } catch(error) {
      console.log(error);
      return error;
    }
  }

  public async sendMail(message: string, recipient: string) {
    await this.authenticate();
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

  public async verifyUser(name: string, surname: string, recipient: string, code: string)  {
    await this.authenticate();
    const mailOptions = {
        from: 'Samuel de Souza Taveira - <samuelgsete@gmail.com>',
        to: `${recipient}`,
        subject: 'Cofirmação de conta',
        html: this.generatePageWelcome(name, surname, code)
    }
        
    this.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
  }

  public async recoverUser(name: string, surname: string, recipient: string, code: string)  {
    await this.authenticate();
    const mailOptions = {
        from: 'Samuel de Souza Taveira - <gseteapi@gmail.com>',
        to: `${recipient}`,
        subject: 'Recuperação de Conta',
        html: this.generatePageRecover(name, surname, code)
    }
        
    this.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
  }

  private generatePageWelcome(name: string, surname: string, code: string) {
    let document = '';
    ejs.renderFile('src/shared/services/welcome.ejs', { name: name, surname: surname, code: code, registeredIn: new Date(), dateFormat: dateFormat }, (err, html) => {
      if(err) {
          throw new Error('Não foi possivel renderizar o documento');
      }
      else {
          document = html;  
      }
    }); 
    return document;
  }

  private generatePageRecover(name: string, surname: string, code: string) {
    let document = '';
    ejs.renderFile('src/shared/services/recover.ejs', { name: name, surname: surname, code: code, registeredIn: new Date(), dateFormat: dateFormat }, (err, html) => {
      if(err) {
          throw new Error('Não foi possivel renderizar o documento');
      }
      else {
          document = html;  
      }
    }); 
    return document;
  }
}