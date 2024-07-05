import { CreateCustomerDto } from '@/customer/customer.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginCustomerDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('Auth Management')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateCustomerDto) {
    const user = await this.authService.register(createUserDto);
    return user;
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginCustomerDto) {
    return this.authService.login(loginUserDto);
  }

  // forgot-password or reset-password

  // change-password
}
