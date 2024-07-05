import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';

@ApiBearerAuth()
@ApiTags('Product Management')
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
  @ApiOperation({ summary: 'Admin - Get all categories with pagination' })
  getAllCategories(
    @Query(ValidationPipe) getAllCategoryDto: GetAllCategoryDto,
  ) {
    return this.categoryService.findAllWithPagination(getAllCategoryDto);
  }
}
