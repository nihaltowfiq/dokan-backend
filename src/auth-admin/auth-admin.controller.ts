import { CreateAdminDto } from '@/admin/admin.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from './auth-admin.dto';
import { AuthAdminService } from './auth-admin.service';

@ApiBearerAuth()
@ApiTags('Admin Auth Management')
@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateAdminDto) {
    const user = await this.authAdminService.register(createUserDto);
    return user;
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginAdminDto) {
    return this.authAdminService.login(loginUserDto);
  }
}
