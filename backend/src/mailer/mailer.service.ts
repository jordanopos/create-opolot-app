import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import { Resend } from 'resend';

interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class MailerService {
  private resend: Resend;
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  private generateEmail = (template) => {
    return render(template);
  };

  async sendMail({ email, subject, template }: SendMailConfiguration) {
    const html = this.generateEmail(template);

    const { data, error } = await this.resend.emails.send({
      from: 'Jordan at LotosCRM <onboarding@resend.dev>',
      to: [email],
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  }
}
