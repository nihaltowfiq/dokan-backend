import config from '@/config';
import { CustomerModule } from '@/customer/customer.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthCustomerController } from './auth-customer.controller';
import { AuthCustomerService } from './auth-customer.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.auth.secret,
      signOptions: { expiresIn: config.auth.expiresIn },
    }),
    CustomerModule,
  ],
  providers: [AuthCustomerService],
  controllers: [AuthCustomerController],
  exports: [AuthCustomerService],
})
export class AuthCustomerModule {}
