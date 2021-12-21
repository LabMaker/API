import { Injectable } from '@nestjs/common';
import { CreateLogDto } from '../dtos/create-log.dto';
import { ILog } from '../interfaces/log.interface';
import { LogQueryParms } from '../controllers/logs.controller';
import { PrismaService } from '../../prisma.service';
import { Log } from '.prisma/client';

@Injectable()
export class LogsService implements ILog {
  constructor(private prismaService: PrismaService) {}

  async getLogs(nodeId: number): Promise<Log[]> {
    return await this.prismaService.log.findMany({
      take: 250,
      orderBy: { id: 'desc' },
      where: { nodeId },
    });
  }

  async queryGetLogs(nodeId: number, query: LogQueryParms): Promise<Log[]> {
    let filter = { nodeId, pm: false };

    if (query.pmOnly) {
      filter.pm = true;
    }

    return await this.prismaService.log.findMany({
      take: 250,
      orderBy: { id: 'desc' },
      where: filter,
    });
  }

  async getSubmissionIds(nodeId: number): Promise<string[]> {
    const logs = await this.getLogs(nodeId);

    let submissionIds = [];

    logs.forEach((log) => {
      submissionIds.push(log.subId);
    });

    return submissionIds;
  }

  async createLog(newLog: CreateLogDto): Promise<Log> {
    return await this.prismaService.log.create({ data: newLog });
  }
}
