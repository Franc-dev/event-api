import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// src/auth/dto/signup.dto.ts
export class SignupDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  password: string;
}
