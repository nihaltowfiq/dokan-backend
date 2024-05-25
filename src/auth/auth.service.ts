/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginCustomerDto } from './auth.dto';
import { CustomerService } from '@/customer/customer.service';
import { CreateCustomerDto } from '@/customer/customer.dto';
import { PasswordHelper } from '@/utils/helpers';
import { Customer } from '@/customer/customer.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<Customer, 'password'>> {
    const user = await this.customersService.findCustomer(email);
    if (user && (await PasswordHelper.comparePassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginCustomerDto: LoginCustomerDto) {
    const { email, password } = loginCustomerDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.getToken(user);

    return { ...user, token };
  }

  async register(createUserDto: CreateCustomerDto) {
    const { email, phone } = createUserDto;
    await this.ensureUserDoesNotExist(email, phone);

    const hashedPassword = await PasswordHelper.hashPassword(
      createUserDto.password,
    );

    const user = await this.customersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const token = await this.getToken(user);

    delete user['password'];

    const finalResult = { user, token };
    console.log({ finalResult });

    return finalResult;
  }

  private async ensureUserDoesNotExist(email: string, phone: string) {
    const existingUser = await this.customersService.findCustomer(email, phone);

    if (existingUser) {
      throw new ConflictException(
        'User with this email or phone number already exists.',
      );
    }
  }

  private async getToken(user: Omit<Customer, 'password'>) {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
