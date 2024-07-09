import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty()
  @MaxLength(12)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @MaxLength(16)
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
