import {
  Body,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './customer.dto';
import { AuthGuard } from '@/auth/auth.guard';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.customerService.findOne(req.customer);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body(ValidationPipe) updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.updateOne(
      req.customer,
      updateCustomerDto,
    );
  }

  // avatar picture upload

  // change email or phone

  // verify email or phone
}
