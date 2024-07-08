import { CustomerGuardResponse } from '@/auth-customer/auth-customer.type';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto, UpdateAddressDto } from './address.dto';
import { Address } from './address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async create(
    customer: CustomerGuardResponse,
    createAddressDto: CreateAddressDto,
  ) {
    const addresses = await this.findAll(customer);

    if (addresses?.length >= 5) {
      throw new BadRequestException(
        'Customer can not add more than 5 address.',
      );
    }

    const address = await this.addressModel.create({
      ...createAddressDto,
      customer: customer.id,
    });
    return address;
  }

  async findOne(id: string) {
    const address = this.addressModel
      .findOne({ _id: id }, { customer: 0 })
      .exec();

    if (!address) throw new NotFoundException('Address not found');

    return address;
  }

  async findAll(customer: CustomerGuardResponse) {
    const addresses = this.addressModel
      .find({ customer: customer.id }, { customer: 0 })
      .exec();
    return addresses;
  }

  async deleteOne(id: string) {
    const deletedAddress = this.addressModel
      .findOneAndDelete({ _id: id }, { customer: 0 })
      .exec();

    if (!deletedAddress) throw new NotFoundException('Address not found');

    return deletedAddress;
  }

  async updateOne(id: string, updateAddressDto: UpdateAddressDto) {
    const updatedAddress = this.addressModel
      .findOneAndUpdate({ _id: id }, { $set: updateAddressDto }, { new: true })
      .exec();

    if (!updatedAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return updatedAddress;
  }
}
