import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { AuthCustomerModule } from './auth-customer/auth-customer.module';
import { BrandsModule } from './brands/brands.module';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import config from './config';
import { CustomerModule } from './customer/customer.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    MongooseModule.forRoot(config.database.uri),
    UsersModule,
    AuthCustomerModule,
    ProductsModule,
    OrdersModule,
    CartModule,
    CustomerModule,
    AddressModule,
    BrandsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
