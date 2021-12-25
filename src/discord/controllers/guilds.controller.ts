import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { UserDetails } from '../../auth/userDetails.dto';
import { Guild } from '../dtos/Guild.dto';
import { CurrentUser } from '../../utils/getUser.decorator';
import { IGuild } from '../interfaces/guild.interface';
import { JwtAuthGuard } from '../../auth/guards/Jwt.guard';

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

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getLocalData(@Param('id') id: string) {
    return this.guildService.getLocalData(id);
  }
}
