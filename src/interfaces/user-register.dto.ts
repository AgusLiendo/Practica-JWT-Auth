import { IsString, IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsPositive()
  rolId: number;
}