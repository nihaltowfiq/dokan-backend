import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    JwtModule,
  ],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
