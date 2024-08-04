import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() request) {
    const { id } = request.user;
    const user = await this.userService.findById(+id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
