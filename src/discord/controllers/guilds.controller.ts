import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { UserDetails } from '../../auth/userDetails.dto';
import { Guild } from '../dtos/Guild.dto';
import { CurrentUser } from '../../utils/getUser.decorator';
import { JwtAuthGuard } from '../../utils/guards/Jwt.guard';
import { IGuild } from '../interfaces/guild.interface';

@Controller('discord/guilds')
export class GuildsController {
  constructor(
    @Inject('GUILD_SERVICE')
    private readonly guildService: IGuild,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getGuilds(@CurrentUser() user: UserDetails): Promise<Guild[]> {
    return this.guildService.fetchGuilds(user);
  }
}
