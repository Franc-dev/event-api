/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/jobs/jobs.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import * as dayjs from 'dayjs';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  // Runs every minute (adjust as needed)
  @Cron(CronExpression.EVERY_MINUTE)
  async handleUpcomingEvents() {
    const now = new Date();
    const inOneHour = dayjs(now).add(1, 'hour').toDate();

    const events = await this.prisma.event.findMany({
      where: {
        startTime: {
          gte: now,
          lte: inOneHour,
        },
      },
      include: {
        tickets: {
          include: { user: true },
        },
      },
    });

    for (const event of events) {
      for (const ticket of event.tickets) {
        await this.mailService.sendEventReminder(ticket.user.email, event.title, event.startTime);
      }
    }

    if (events.length) this.logger.log(`Sent reminders for ${events.length} events`);
  }
}
