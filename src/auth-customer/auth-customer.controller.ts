import { CreateCustomerDto } from '@/customer/customer.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginCustomerDto } from './auth-customer.dto';
import { AuthCustomerService } from './auth-customer.service';

@ApiBearerAuth()
@ApiTags('Customer Auth Management')
@Controller('auth')
export class AuthCustomerController {
  constructor(private readonly authCustomerService: AuthCustomerService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateCustomerDto) {
    const user = await this.authCustomerService.register(createUserDto);
    return user;
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginCustomerDto) {
    return this.authCustomerService.login(loginUserDto);
  }

  // forgot-password or reset-password

  // change-password
}
