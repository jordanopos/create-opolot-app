import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Res() res: Response, @Body() data: LoginUserDto) {
    const { user, access_token } = await this.authService.login(data);
    const payload = {
      user: user,
      access_token: access_token,
    };

    return res.json(payload);
  }

  @Post('/register')
  async register(@Res() res: Response, @Body() data: CreateUserDto) {
    const { user, access_token } = await this.authService.register(data);

    const payload = {
      user: user,
      access_token: access_token,
    };

    return res.json(payload);
  }
}
