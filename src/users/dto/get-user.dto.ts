import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsString()
  filter?: object;
}

export class GetUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id: number;
}

