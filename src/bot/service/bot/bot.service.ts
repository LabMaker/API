import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { configDetails, LogDetails, PaymentDetails } from 'src/bot/types/types';
import { Config, Logs, Payments } from 'src/typeorm';
import { Repository } from 'typeorm';
import { IBotService } from './Bot';

@Injectable()
export class BotService implements IBotService {
  constructor(
    @InjectRepository(Config) private configRepository: Repository<Config>,
    @InjectRepository(Logs) private logRepository: Repository<Logs>,
    @InjectRepository(Payments)
    private paymentRepository: Repository<Payments>,
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

  updateConfig(ConfigDto: configDetails) {
    return this.configRepository.update(ConfigDto.id, ConfigDto);
  }

  getPayments(): Promise<Payments[]> {
    return this.paymentRepository.find();
  }

  updatePayments(paymentDto: PaymentDetails) {
    Object.entries(paymentDto).forEach(([key, data]) => {
      let payment = JSON.parse(JSON.stringify(data));

      //Update Item in Table
      this.paymentRepository.update(payment.id, payment).then((result) => {
        //Item To Update Doesnt Exist
        if (result.affected === 0) {
          this.paymentRepository.insert({
            name: payment.name,
            value: payment.value,
            type: payment.type,
          });
        }
      });
    });
    return;
  }

  updateMessage(pmBody: string) {
    return this.configRepository.update(1, { pmBody: pmBody });
  }
}
