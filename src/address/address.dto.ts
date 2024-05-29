import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  street_address: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  notes: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsPhoneNumber('BD')
  phone_number: string;
}
