import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from '../../schemas/LogSchema';
import { CreateLogDto } from '../dtos/create-log.dto';
import { ILog } from '../interfaces/log.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LogsService implements ILog {
  constructor(
    @InjectModel(Log.name) private logRepository: Model<LogDocument>,
  ) {}

  async getLogs(nodeId: string): Promise<Log[]> {
    console.log(nodeId);
    return await this.logRepository
      .find({
        nodeId,
        pm: true,
      })
      .sort({ createdAt: -1 })
      .limit(250);
  }

  async getSubmissionIds(nodeId: string): Promise<string[]> {
    const logs = await this.logRepository
      .find({
        nodeId,
      })
      .sort({ createdAt: -1 })
      .limit(300);

    let submissionIds = [];

    logs.map((log) => {
      submissionIds.push(log.subId);
    });

    return submissionIds;
  }

  async createLog(newLog: CreateLogDto): Promise<Log> {
    newLog._id = uuidv4();

    const createdLog = new this.logRepository(newLog);

    return await createdLog.save();
  }
}
