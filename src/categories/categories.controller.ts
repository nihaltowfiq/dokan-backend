import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
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

  @Get('all') // { no guard - for admin - pagination, sorting, filter }
  getAllCategories() {
    return null;
  }
}
