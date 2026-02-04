import { IsEmail, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  money?: number;

  @IsOptional()
  @IsNumber()
  currentDay?: number;

  @IsOptional()
  @IsNumber()
  timeRemainingToday?: number;

  @IsOptional()
  @IsNumber()
  trainerSkillLevel?: number;
}

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  money: number;
  currentDay: number;
  timeRemainingToday: number;
  trainerSkillLevel: number;
  createdAt: Date;
  lastActiveAt: Date;
}
