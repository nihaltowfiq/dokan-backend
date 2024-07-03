import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetAllCategoryDto } from './categories.dto';
import { Category } from './categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  findAll() {
    return '';
  }

  async findAllWithPagination(getAllCategoryDto: GetAllCategoryDto) {
    const { page = 1, sort = 'asc', per_page = 3 } = getAllCategoryDto || {};
    const currentPage = +page;

    const skip = (currentPage - 1) * per_page;
    const sortOrder = sort === 'asc' ? 1 : -1;

    const categories = await this.categoryModel
      .find({})
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(per_page)
      .exec();

    const totalItems = await this.categoryModel.countDocuments();
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

  addOne() {
    return '';
  }

  updateOne() {
    return '';
  }

  deleteOne() {
    return '';
  }
}
