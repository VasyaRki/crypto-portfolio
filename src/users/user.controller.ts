import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindOptionsSelect,
  FindOptionsRelations,
} from 'typeorm';



@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get users by filter' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(@Query() filter: FindOptionsWhere<User>): Promise<User[]> {
    return this.userService.getMany(filter);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Delete()
  delete(@Param('id') id): Promise<boolean> {
    return this.userService.delete(id);
  } 
}
