import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('BD')
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

class CustomerDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsPhoneNumber('BD')
  phone: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  avatar_url: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  date_of_birth: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  gender: string;
}

export class UpdateCustomerDto extends PartialType(CustomerDto) {}
