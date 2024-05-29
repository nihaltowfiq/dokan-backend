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
    console.log(customerId);

    const address = await this.addressModel.create(createAddressDto);
    return address;
  }
}
