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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  getAllUsers(@Query(ValidationPipe) getUsersDto: GetUsersDto) {
    return this.usersService.findAll(getUsersDto);
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Get single user' })
  getSingleUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create a user' })
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('/update/:userId')
  @ApiOperation({ summary: 'Update a user' })
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) createUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(userId, createUserDto);
  }

  @Delete('/delete/:userId')
  @ApiOperation({ summary: 'Delete a user' })
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteOne(userId);
  }
}
