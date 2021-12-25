import { Log } from '@prisma/client';
import { LogQueryParms } from '../controllers/logs.controller';
import { CreateLogDto } from '../dtos/create-log.dto';

export interface ILog {
  getLogs(nodeId: number): Promise<Log[]>;
  queryGetLogs(nodeId: number, query: LogQueryParms): Promise<Log[]>;
  createLog(logConfigDto: CreateLogDto): Promise<Log>;
  getSubmissionIds(nodeId: number): Promise<string[]>;
}
