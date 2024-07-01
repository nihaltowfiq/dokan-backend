import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
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
