import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { UserDetails } from '../../auth/userDetails.dto';
import {
  DiscordConfig,
  DiscordConfigDocument,
} from '../../schemas/DiscordConfigSchema';
import { Guild } from '../dtos/Guild.dto';
import { UserService } from '../../user/user.service';
import { IGuild } from '../interfaces/guild.interface';

@Injectable()
export class GuildsService implements IGuild {
  constructor(
    private userService: UserService,
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectModel(DiscordConfig.name)
    private guildConfigRepository: Model<DiscordConfigDocument>,
  ) {}

  async fetchGuilds(user: UserDetails): Promise<Guild[]> {
    const userDetails = await this.userService.getUserDetails(user._id);
    console.log(userDetails.accessToken);

    const fetchedGuilds = this.httpService.get(
      'http://discord.com/api/v8/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      },
    );

    const guilds = await (await lastValueFrom(fetchedGuilds)).data;

    const validGuilds: Guild[] = [];

    guilds.forEach((guild: Guild) => {
      const perms = Number(guild.permissions);
      if (perms & 0x0000000020) {
        validGuilds.push(guild);
      }
    });

    let spliceIndex = 0;

    await Promise.all(
      validGuilds.map(async (guild) => {
        const storedGuild = await this.guildConfigRepository.findOne({
          _id: guild.id,
        });

        if (storedGuild) {
          guild.joined = true;
          validGuilds.splice(validGuilds.indexOf(guild), 1);
          validGuilds.splice(spliceIndex, 0, guild);
          const filter = { _id: guild.id };

          await this.guildConfigRepository.findOneAndUpdate(filter, guild, {
            useFindAndModify: false,
          });
          spliceIndex++;
        }
      }),
    );

    return validGuilds;
  }
}
