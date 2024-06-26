import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    MongooseModule.forRoot(config.database.uri),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    CartModule,
    CustomerModule,
    AddressModule,
  ],
})
export class AppModule {}
