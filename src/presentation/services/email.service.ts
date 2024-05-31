import nodemailer, { Transporter } from "nodemailer";


export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    senderEmailPassword: string,
    private readonly postToProvider: boolean,
  ) {

    this.transporter = nodemailer.createTransport( {
      service: mailerService,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      }
    });

  }


  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachments = [] } = options;


    try {

      if( !this.postToProvider ) return true

      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      // console.log( sentInformation );

      return true;
    } catch ( error ) {
      console.log(error);
      return false;
    }

  }



}
