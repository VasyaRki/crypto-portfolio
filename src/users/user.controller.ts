import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOptionsWhere } from 'typeorm';
import { ArgUser, UseToken } from '../decorators/auth.decorators';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.service.getOne({ id }, ['portfolio']);
  }

  @ApiOperation({ summary: 'Get users by filter' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(@Query() filter: FindOptionsWhere<User>): Promise<User[]> {
    return this.service.getMany(filter);
  }

  @ApiOperation({ summary: 'Update authorized user' })
  @ApiResponse({ status: 200, type: User })
  @UseToken()
  @Patch()
  update(@ArgUser() user: User, @Body() body: Partial<User>): Promise<User> {
    return this.service.save({
      id: user.id,
      ...body,
    });
  }

  @ApiOperation({ summary: 'Delete authorized user' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseToken()
  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.service.delete(id);
  }
}
