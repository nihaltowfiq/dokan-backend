import { AuthAdminGuard } from '@/auth-admin/auth-admin.guard';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetAllAdminDto } from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthAdminGuard)
  @Get('all')
  async getProfile(@Query(ValidationPipe) getAllAdmin: GetAllAdminDto) {
    return await this.adminService.findAll(getAllAdmin);
  }
}
