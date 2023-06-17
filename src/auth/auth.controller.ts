import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseToken, ArgUser } from '../decorators/auth.decorators';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  TokenDto,
  UserLoginDto,
  UserRegistrationDto,
} from './dto/user-login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({ summary: 'Check authentication status' })
  @ApiResponse({ status: 200, type: UserDto })
  @UseToken()
  @Get()
  checkAuth(@ArgUser() user: UserDto): UserDto {
    return user;
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('/login')
  login(@Body() user: UserLoginDto) {
    return this.service.login(user);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('/registration')
  register(@Body() userDto: UserRegistrationDto) {
    return this.service.register(userDto);
  }
}
