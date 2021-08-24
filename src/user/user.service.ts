import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async fetchGuilds(accessToken: string): Promise<any> {
    const fetchedGuilds = this.httpService.get(
      'http://discord.com/api/v8/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const guilds = await (await lastValueFrom(fetchedGuilds)).data;
    const validGuilds = [];
    guilds.forEach((guild) => {
      const perms = guild.permissions;
      if (perms & 0x0000000020) {
        validGuilds.push(guild);
      }
    });

    return validGuilds;
  }
}
