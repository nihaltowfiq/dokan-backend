import { AdminModule } from '@/admin/admin.module';
import config from '@/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.auth.secret,
      signOptions: { expiresIn: config.auth.expiresIn },
    }),
    AdminModule,
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
