import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { configDetails, LogDetails } from 'src/bot/types/types';
import { Config, DiscordConfig, Logs } from 'src/typeorm';
import { Repository } from 'typeorm';
import { IBotService } from './Bot';

@Injectable()
export class BotService implements IBotService {
  constructor(
    @InjectRepository(Config) private configRepository: Repository<Config>,
    @InjectRepository(Logs) private logRepository: Repository<Logs>,
    @InjectRepository(DiscordConfig)
    private discordConfigRepository: Repository<DiscordConfig>,
  ) {}

  async getSubmissions(): Promise<Logs[]> {
    let submissions = await this.logRepository.find();
    let subIds = [];
    for (var sub of submissions) {
      subIds.push(sub.subId);
    }
    return subIds;
  }

  getLogs(): Promise<Logs[]> {
    // Only return latest 250 rows
    return this.logRepository.find({ take: 250, order: { id: 'DESC' } });
  }

  createLog(LogDto: LogDetails) {
    return this.logRepository.insert(LogDto);
  }

  getConfig(): Promise<Config[]> {
    return this.configRepository.find();
  }

  getDiscordConfig(): Promise<DiscordConfig[]> {
    return this.discordConfigRepository.find();
  }

  updateConfig(ConfigDto: configDetails) {
    return this.configRepository.update(ConfigDto.id, ConfigDto);
  }

  updateMessage(pmBody: string) {
    return this.configRepository.update(1, { pmBody: pmBody });
  }
}
