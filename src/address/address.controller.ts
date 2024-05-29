import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './address.dto';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Request() req,
    @Body(ValidationPipe) createAddressDto: CreateAddressDto,
  ) {
    const address = await this.addressService.create(
      req.user.id,
      createAddressDto,
    );
    return address;
  }

  // @Put('update:id')
  // async update(@Body(ValidationPipe) createAddressDto: CreateAddressDto) {
  //   const address = await this.addressService.create(createAddressDto);
  //   return address;
  // }
}
