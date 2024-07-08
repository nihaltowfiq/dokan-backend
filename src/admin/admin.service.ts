import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto, GetAllAdminDto } from './admin.dto';
import { Admin } from './admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto) {
    const newAdmin = await this.adminModel.create(createAdminDto);

    return newAdmin;
  }

  async findByUsername(username: string): Promise<Admin | null> {
    let admins = null;

    try {
      admins = await this.adminModel
        .aggregate([
          {
            $match: { username: username },
          },
          {
            $project: {
              _id: 0,
              id: '$_id',
              name: 1,
              username: 1,
              password: 1,
              email: 1,
              avatar_url: 1,
            },
          },
        ])
        .exec();
    } catch (error) {
      console.log(error);
    }

    return admins?.[0];
  }

  async findAll(getUsersDto: GetAllAdminDto) {
    const { page = 1, per_page = 3 } = getUsersDto || {};
    const currentPage = +page;

    const skip = (currentPage - 1) * per_page;

    const users = await this.adminModel
      .find({})
      .skip(skip)
      .limit(per_page)
      .exec();

    const totalItems = await this.adminModel.countDocuments();
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
}
