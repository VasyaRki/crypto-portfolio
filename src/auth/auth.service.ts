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
import { UserLoginDto } from './dto/user-login.dto';
import { TokenDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(@Body() userDto: UserLoginDto): Promise<TokenDto> {
    const user = await this.validateUser(userDto);

    const token = await this.generateToken(user);
    return { accessToken: token };
  }

  async register(userDto: UserLoginDto): Promise<TokenDto> {
    const { email } = userDto;
    const candidate = await this.userService.getOne({ email });

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);

    return { accessToken: token };
  }

  async generateToken(user) {
    const { email, username, id } = user;
    const payload = { email, username, id };

    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  private async validateUser(userDto: UserLoginDto): Promise<UserLoginDto> {
    const user = await this.userService.getOne({ email: userDto.email });

    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
