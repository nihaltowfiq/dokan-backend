import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(12)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MaxLength(16)
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class GetAllAdminDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  per_page?: number;
}
