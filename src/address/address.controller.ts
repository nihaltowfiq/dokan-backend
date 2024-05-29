import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './address.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { CustomerGuardResponse } from '@/auth/auth.type';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createAddress(
    @Request() req,
    @Body(ValidationPipe) createAddressDto: CreateAddressDto,
  ) {
    const address = await this.addressService.create(
      req.customer as CustomerGuardResponse,
      createAddressDto,
    );
    return address;
  }

  @UseGuards(AuthGuard)
  @Get('single:id')
  async getSingleAddress(@Request() req) {
    const address = await this.addressService.findOne(req.customer);
    return address;
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllAddress(@Request() req) {
    const addresses = await this.addressService.findAll(req.customer);
    return addresses;
  }

  // @Put('update:id')
  // async update(@Body(ValidationPipe) createAddressDto: CreateAddressDto) {
  //   const address = await this.addressService.create(createAddressDto);
  //   return address;
  // }
}
