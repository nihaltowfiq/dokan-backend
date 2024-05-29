import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Address } from './address.schema';
import { CreateAddressDto } from './address.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async create(customerId: string, createAddressDto: CreateAddressDto) {
    const address = await this.addressModel.create({
      ...createAddressDto,
      customer: customerId,
    });
    return address;
  }
}
