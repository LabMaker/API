import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { configDetails, LogDetails } from 'src/bot/types/types';
import { Config } from 'src/typeorm';
import { Logs } from 'src/typeorm';
import { Repository } from 'typeorm';
import { IBotService } from './Bot';

@Injectable()
export class BotService implements IBotService {
  constructor(
    @InjectRepository(Config) private configRepository: Repository<Config>,
    @InjectRepository(Logs) private logRepository: Repository<Logs>,
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
    return this.logRepository.find();
  }
  createLog(LogDto: LogDetails) {
    return this.logRepository.insert(LogDto);
  }
  getConfig(): Promise<Config[]> {
    return this.configRepository.find();
  }

  updateConfig(ConfigDto: configDetails) {
    return this.configRepository.update(ConfigDto.id, ConfigDto);
  }
}
