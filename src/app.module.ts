// src/app.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// Import your modules
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JobsService } from './jobs/jobs.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventModule,
    TicketModule,
    PrismaModule,
    AuthModule,
    MailModule,
  ],
  providers: [JobsService],
})
export class AppModule {}
