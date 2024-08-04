import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(data: CreateUserDto) {
    const hash = await bcrypt.hash(data.password, 10);

    let user = await this.userService.createUser({
      email: data.email,
      password: hash,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    const payload = {
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async login(data: LoginUserDto) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new BadRequestException(
        'A user with the specified email address does not exist',
      );
    }

    const success = await bcrypt.compare(data.password, user.password);

    if (!success) {
      throw new BadRequestException('Wrong password provided');
    }

    const payload = {
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
