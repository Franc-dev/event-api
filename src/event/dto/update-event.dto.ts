import { ApiProperty } from '@nestjs/swagger';
export class UpdateEventDto {
  @ApiProperty({ required: false })
  title?: string;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty({ required: false })
  location?: string;
  @ApiProperty({ required: false })
  startTime?: Date;
  @ApiProperty({ required: false })
  endTime?: Date;
}
