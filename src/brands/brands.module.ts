import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsController } from './brands.controller';
import { Brand, BrandSchema } from './brands.schema';
import { BrandsService } from './brands.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
