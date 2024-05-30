import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomerDto } from './customer.dto';
import { GeneratorHelper } from '@/utils/helpers';
import { CustomerGuardResponse } from '@/auth/auth.type';
import { UpdateUserDto } from '@/users/users.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async create(createUserDto: CreateCustomerDto) {
    const customer_id = GeneratorHelper.generateCustomerId();

    const newUser = await this.customerModel.create({
      ...createUserDto,
      customer_id,
    });

    return newUser;
  }

  async findCustomerByEmailOrPhone(
    email: string,
    phone: string = '',
  ): Promise<Customer | null> {
    let customers = null;

    try {
      customers = await this.customerModel
        .aggregate([
          {
            $match: {
              $or: [{ email }, { phone }],
            },
          },
          {
            $project: {
              _id: 0,
              id: '$_id',
              customer_id: 1,
              first_name: 1,
              last_name: 1,
              password: 1,
              email: 1,
              phone: 1,
              avatar_url: 1,
              date_of_birth: 1,
              gender: 1,
            },
          },
        ])
        .exec();
    } catch (error) {
      console.log(error);
    }

    return customers?.[0];
  }

  async findOne(customer: CustomerGuardResponse) {
    const data = await this.customerModel
      .findOne(
        { customer_id: customer.customer_id },
        { addresses: 0, __v: 0, password: 0 },
      )
      .exec();

    if (!data) throw new NotFoundException('Customer not found');

    return data;
  }

  async updateOne(
    customer: CustomerGuardResponse,
    updateUserDto: UpdateUserDto,
  ) {
    const data = await this.customerModel
      .findOneAndUpdate(
        { customer_id: customer.customer_id },
        { $set: updateUserDto },
        { new: true, projection: { addresses: 0, password: 0, __v: 0 } },
      )
      .exec();

    if (!data) throw new NotFoundException('Customer not found');

    return data;
  }
}
