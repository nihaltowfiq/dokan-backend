import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BrandsService } from './brands.service';

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
