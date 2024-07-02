import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}
  @Get('') // { no guard - for customers }
  getCategories() {
    return null;
  }

  @Post('create') // { admin auth guard }
  createCategory() {
    return null;
  }

  @Put(':slug') // { admin auth guard }
  updateCategory() {
    return null;
  }

  @Delete(':slug') // { admin auth guard }
  deleteCategory() {
    return null;
  }

  @Get('all') // { auth guard - for admin - pagination, sorting, filter }
  getAllCategories() {
    return null;
  }
}
