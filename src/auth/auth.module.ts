import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { CustomerModule } from '@/customer/customer.module';
import config from '@/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.auth.secret,
      signOptions: { expiresIn: config.auth.expiresIn },
    }),
    CustomerModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
