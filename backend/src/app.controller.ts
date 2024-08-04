import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from './mailer/mailer.service';
import Welcome from 'emails/welcome';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: MailerService,
  ) {}

  @Get('send-email')
  async sendEmail(@Body() body: { email: string; subject: string }) {
    await this.emailService.sendMail({
      email: body.email,
      subject: body.subject,
      template: Welcome({ url: 'https://example.com' }),
    });

    return 'email has been sent successfully';
  }
}
