/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/ticket/ticket.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: {
        userId: dto.userId,
        eventId: dto.eventId,
      },
    });
  }

  findAll() {
    return this.prisma.ticket.findMany({
      include: { user: true, event: true },
    });
  }

  findByUser(userId: string) {
    return this.prisma.ticket.findMany({
      where: { userId },
      include: { event: true },
    });
  }
}
