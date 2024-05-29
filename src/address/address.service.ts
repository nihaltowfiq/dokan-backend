import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Address } from './address.schema';
import { CreateAddressDto } from './address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerGuardResponse } from '@/auth/auth.type';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async create(
    customer: CustomerGuardResponse,
    createAddressDto: CreateAddressDto,
  ) {
    const address = await this.addressModel.create({
      ...createAddressDto,
      customer: customer.id,
    });
    return address;
  }

  async findOne(customer: CustomerGuardResponse) {
    const address = this.addressModel.findOne({ _id: customer.id });
    return address;
  }

  async findAll(customer: CustomerGuardResponse) {
    const addresses = this.addressModel
      .find({ customer: customer.id }, { customer: 0 })
      .exec();
    return addresses;
  }
}
