import { GeneratorHelper } from '@/utils/helpers';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto, GetAllBrandDto } from './brands.dto';
import { Brand } from './brands.schema';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  async findAll(getAllBrandDto: GetAllBrandDto) {
    const { page = 1, sort = 'asc', per_page = 3 } = getAllBrandDto || {};
    const currentPage = +page;

    const skip = (currentPage - 1) * per_page;
    const sortOrder = sort === 'asc' ? 1 : -1;

    const categories = await this.brandModel
      .find({})
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(per_page)
      .exec();

    const totalItems = await this.brandModel.countDocuments();
    const totalPages = Math.ceil(totalItems / per_page);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return {
      categories,
      totalItems,
      currentPage,
      totalPages,
      nextPage,
    };
  }

  async addOne(createBrandDto: CreateBrandDto) {
    const slug = GeneratorHelper.generateSlug(createBrandDto.name);
    const newBrand = await this.brandModel.create({ slug, ...createBrandDto });
    return newBrand;
  }

  updateOne() {
    return '';
  }

  deleteOne() {
    return '';
  }
}
