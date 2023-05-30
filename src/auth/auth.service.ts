import {
  Injectable,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(@Body() userDto: any) {
    const user = await this.validateUser(userDto);

    const token = await this.generateToken(user);
    return {accessToken: token};
  }

  async registrations(@Body() userDto: any) {
    const { email } = userDto;
    const candidate = await this.userService.getOne({ email });

    if (candidate) {
      throw new HttpException('Already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async generateToken(user) {
    const payload = { email: user.email, username: user.username, id: user.id };

    return this.jwtService.sign(payload, { expiresIn: '1h' })

  }

  private async validateUser(userDto) {
    const user = await this.userService.getOne({ email: userDto.email });
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);

    console.log({ user, passwordEqual });

    if (user && passwordEqual) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
