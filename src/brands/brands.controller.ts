import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Post('create')
  createBrand() {
    return null;
  }

  @Put(':slug')
  updateBrand() {
    return null;
  }
  @Delete(':slug')
  deleteBrand() {
    return null;
  }

  @Get('all')
  getAll() {
    return null;
  }
}
