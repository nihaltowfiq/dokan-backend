import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @IsNotEmpty()
  // @IsPhoneNumber('BD')
  // phone: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
