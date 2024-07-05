import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';

@ApiBearerAuth()
@ApiTags('Product Management')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}
  @Post('create') // { admin auth guard }
  createBrand() {
    return null;
  }

  @Put(':slug') // { admin auth guard }
  updateBrand() {
    return null;
  }

  @Delete(':slug') // { admin auth guard }
  deleteBrand() {
    return null;
  }

  @Get('all') //{ admin auth guard - pagination, sorting, filter }
  getAllBrands() {
    return null;
  }
}
