import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'user1' })
  @IsNotEmpty()
  username: string;
}
