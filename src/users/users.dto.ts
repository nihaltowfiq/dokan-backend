import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

type Role = 'customer' | 'admin';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['customer', 'admin'], { message: 'Valid role required' })
  role: Role;

  @IsNotEmpty()
  @IsPhoneNumber('BD')
  phone: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class GetUsersDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  per_page?: number;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
