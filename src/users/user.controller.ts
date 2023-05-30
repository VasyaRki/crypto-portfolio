import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { FindOptionsWhere } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ArgUser, UseToken } from '../decorators/auth.decorators';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}
  @UseToken()
  @Get()
  getProfile(@ArgUser() user: any) {
    return user;
  }


  @Get(':id')
  getUser(@Param('id') id: number): Promise<any> {
    return this.service.getOne({ id }, ['portfolio']);
  }

  @ApiOperation({ summary: 'Get users by filter' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/all')
  getAll(@Query() filter: FindOptionsWhere<User>): Promise<User[]> {
    return this.service.getMany(filter);
  }

  @UseToken()
  @Patch()
  update(@ArgUser() user: any, @Body() body: any) {
    return this.service.save({
      id: user.id,
      ...body,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.service.delete(id);
  }
}
