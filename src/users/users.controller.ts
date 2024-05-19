import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, GetUsersDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  getAllUsers(@Query(ValidationPipe) getUsersDto: GetUsersDto) {
    return this.usersService.findAll(getUsersDto);
  }

  @Get('/:userId')
  getSingleUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Post('/create')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('/update/:userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) createUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(userId, createUserDto);
  }

  @Delete('/delete/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteOne(userId);
  }
}
