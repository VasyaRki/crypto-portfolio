import {
  Controller,
  Post,
  Body,
  Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseToken, ArgUser } from '../decorators/auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseToken()
  @Get()
  checkAuth(@ArgUser() user : any) {
    return user;
  }

  @Post('/login')
  login(@Body() userDto: any) {
    console.log('/login');

    return this.service.login(userDto);
  }

  @Post('/registration')
  registrations(@Body() userDto: any) {
    return this.service.registrations(userDto);
  }
}
