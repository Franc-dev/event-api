import { ApiProperty } from '@nestjs/swagger';
// src/ticket/dto/create-ticket.dto.ts
export class CreateTicketDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;
}
