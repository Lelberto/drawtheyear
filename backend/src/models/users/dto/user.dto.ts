import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @Length(3, 16)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(3, 32)
  displayName: string;
}

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['email', 'password'])
) {}

export class FindByUsernameParams {

  @IsString()
  username: string;
}

export class UpdateUserParams {

  @IsString()
  username: string;
}
