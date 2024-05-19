import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto, GetUsersDto, UpdateUserDto } from './users.dto';
import { generateUniqueId } from 'src/common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, phone } = createUserDto;

    const existingUser = await this.usersModel
      .findOne({
        $or: [{ email }, { phone }],
      })
      .exec();

    if (existingUser) {
      throw new ConflictException('Email or phone number already in use');
    }

    const userId = generateUniqueId();
    const data: Users = await this.usersModel.create({
      userId,
      ...createUserDto,
    });
    return data;
  }

  async findAll(getUsersDto: GetUsersDto) {
    const { page = 1, role, sort = 'asc', per_page = 3 } = getUsersDto || {};
    const currentPage = +page;

    const skip = (currentPage - 1) * per_page;
    const sortOrder = sort === 'asc' ? 1 : -1;

    const filter = role ? { role } : {};

    const users = await this.usersModel
      .find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(per_page)
      .exec();

    const totalItems = await this.usersModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / per_page);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return {
      users,
      totalItems,
      currentPage,
      totalPages,
      nextPage,
    };
  }

  async findOne(userId: number) {
    const data = await this.usersModel.findOne({ userId }, { _id: 0, __v: 0 });

    if (!data) throw new NotFoundException('User not found');

    return data;
  }

  async updateOne(userId: number, createUserDto: UpdateUserDto) {
    const updatedUser = await this.usersModel
      .findOneAndUpdate(
        { userId },
        { $set: createUserDto },
        { new: true, useFindAndModify: false },
      )
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return updatedUser;
  }

  async deleteOne(userId: number) {
    const data = await this.usersModel.findOneAndDelete({ userId });

    if (!data) throw new NotFoundException('User not found');

    return data;
  }
}
