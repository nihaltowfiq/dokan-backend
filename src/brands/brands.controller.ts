import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBrandDto, GetAllBrandDto } from './brands.dto';
import { BrandsService } from './brands.service';

@ApiBearerAuth()
@ApiTags('Product Management')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Post('create') // { admin auth guard }
  @ApiOperation({ summary: 'Admin - Create brand' })
  createBrand(@Body(ValidationPipe) createBrandDto: CreateBrandDto) {
    return this.brandService.addOne(createBrandDto);
  }

  @Put(':slug') // { admin auth guard }
  updateBrand() {
    return null;
  }

  @Delete(':slug') // { admin auth guard }
  deleteBrand() {
    return null;
  }

  @Get('all') // { auth guard - for admin - pagination, sorting, filter }
  @ApiOperation({ summary: 'Admin - Get all brands with pagination' })
  getAllBrands(@Query(ValidationPipe) getAllBrandDto: GetAllBrandDto) {
    return this.brandService.findAll(getAllBrandDto);
  }
}
