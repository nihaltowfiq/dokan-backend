import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginCustomerDto } from './auth.dto';
import { CreateCustomerDto } from '@/customer/customer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
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

  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
