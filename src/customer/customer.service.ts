import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomerDto } from './customer.dto';
import { GeneratorHelper } from '@/utils/helpers';

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

  async findCustomer(
    email: string,
    phone: string = '',
  ): Promise<Customer | null> {
    return await this.customerModel
      .findOne({ $or: [{ email }, { phone }] })
      .exec();
  }
}
