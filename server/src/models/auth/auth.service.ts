import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.inteface';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    const { exp } = this.jwtService.verify(token);

    return {
      access_token: token,
      access_token_expiration: new Date(exp * 1000).toISOString(),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.email);

    if (user) throw new BadRequestException();

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const createdUser = await this.usersService.create(
      Object.assign(createUserDto, { password: hash }),
    );
    const { password, ...result } = createdUser;

    return result;
  }

  async createAccessToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken) as Record<string, any>;

    if (!decoded) throw new BadRequestException();

    const user = await this.usersService.findOne(decoded.email);

    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
