import { AuthGuard } from '@/auth/auth.guard';
import { CustomerGuardResponse } from '@/auth/auth.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAddressDto, UpdateAddressDto } from './address.dto';
import { AddressService } from './address.service';

@ApiBearerAuth()
@ApiTags('Address Management')
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
  @Get('single/:id')
  async getSingleAddress(@Param('id') id: string) {
    const address = await this.addressService.findOne(id);
    return address;
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllAddress(@Request() req) {
    const addresses = await this.addressService.findAll(req.customer);
    return addresses;
  }

  @UseGuards(AuthGuard)
  @Delete('single/:id')
  async deleteSingleAddress(@Param('id') id: string) {
    const address = await this.addressService.deleteOne(id);
    return address;
  }

  @UseGuards(AuthGuard)
  @Put('single/:id')
  async updateSingleAddress(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
  ) {
    const address = await this.addressService.updateOne(id, updateAddressDto);
    return address;
  }
}
