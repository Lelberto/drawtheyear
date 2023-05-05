import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {

  @IsEmail()
  email: string;

  password?: string;

  @IsString()
  @Length(3, 16)
  username: string;

  @IsString()
  @Length(3, 32)
  displayName: string;
}

export class FindByUsernameParams {

  @IsString()
  username: string;
}
