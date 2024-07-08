import { CreateAdminDto } from '@/admin/admin.dto';
import { Admin } from '@/admin/admin.schema';
import { AdminService } from '@/admin/admin.service';
import { PasswordHelper } from '@/utils/helpers';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './auth-admin.dto';
import { AdminGuardResponse } from './auth-admin.type';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;
    const user = await this.validateUser(username, password);

    if (!user) throw new UnauthorizedException();

    const token = await this.getToken(user);

    // remove the password from the response later
    return { user, token };
  }

  async register(createUserDto: CreateAdminDto) {
    const { username } = createUserDto;
    await this.ensureUserDoesNotExist(username);

    const hashedPassword = await PasswordHelper.hashPassword(
      createUserDto.password,
    );

    const user = await this.adminService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const token = await this.getToken(user);

    // remove the password from the response later
    return { user, token };
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<Admin, 'password'>> {
    const user = await this.adminService.findByUsername(username);

    if (user && (await PasswordHelper.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  private async ensureUserDoesNotExist(username: string) {
    const existingAdmin = await this.adminService.findByUsername(username);

    if (existingAdmin) {
      throw new ConflictException('This username is already exists.');
    }
  }

  private async getToken(admin: Omit<Admin, 'password'>) {
    const payload: AdminGuardResponse = {
      username: admin.username,
      email: admin.email,
      id: admin._id,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
