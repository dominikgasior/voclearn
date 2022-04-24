import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginRequestContract } from '@voclearn/contracts';

export class LoginDto implements LoginRequestContract {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
