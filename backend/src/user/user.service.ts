import {
  BadRequestException,
  Dependencies,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new BadRequestException(
        'An user with the specified email address already exists',
      );
    }

    const gottenUser = await this.prisma.user.create({ data: data });

    return gottenUser;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return user;
  }
  findByEmail(email: string) {
    const user = this.prisma.user.findUnique({ where: { email: email } });
    return user;
  }
}
