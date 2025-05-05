/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEventReminder(email: string, eventTitle: string, eventTime: Date) {
    return this.mailerService.sendMail({
      to: email,
      subject: `Reminder: ${eventTitle}`,
      text: `This is a reminder for your event "${eventTitle}" scheduled at ${eventTime.toLocaleString()}`,
    });
  }
}
