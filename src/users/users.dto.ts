import { ApiProperty, PartialType } from '@nestjs/swagger';
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
const role = ['customer', 'admin'] as const;

export enum UserRole {
  customer = 'customer',
  admin = 'admin',
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(role, { message: 'Valid role required' })
  role: Role;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('BD')
  phone: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class GetUsersDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  per_page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
