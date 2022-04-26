import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 256)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @Length(3, 18)
  readonly password: string;
}
