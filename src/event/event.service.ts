/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEventDto) {
    return this.prisma.event.create({ data: dto });
  }

  findAll() {
    const events = this.prisma.event.findMany();
    console.log('events', events);
    return events;
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateEventDto) {
    return this.prisma.event.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
