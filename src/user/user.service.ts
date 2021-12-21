import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { lastValueFrom } from 'rxjs';
import { UserDetails } from '../auth/userDetails.dto';
import { PrismaService } from '../prisma.service';
import { UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {}

  async getUser(userDetails: UserDetails): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userDetails.id },
      include: { nodes: true },
    });

    const fetchedUser = this.httpService.get(
      `https://discord.com/api/v9/users/@me`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );

    const discordUser = await (await lastValueFrom(fetchedUser)).data;

    const updatedUser = await this.prismaService.user.update({
      where: { id: discordUser.id },
      data: {
        username: discordUser.username,
        discriminator: discordUser.discriminator,
        avatar: discordUser.avatar,
        accessToken: discordUser.accessToken,
        refreshToken: discordUser.refreshToken,
      },
    });

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      discriminator: updatedUser.discriminator,
      avatar: updatedUser.avatar,
      nodes: user.nodes,
    };
  }

  async getUserDetails(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }
}
