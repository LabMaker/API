import { Log } from '../../schemas/LogSchema';
import { LogQueryParms } from '../controllers/logs.controller';
import { CreateLogDto } from '../dtos/create-log.dto';

export interface ILog {
  getLogs(nodeId: string): Promise<Log[]>;
  queryGetLogs(nodeId: string, query: LogQueryParms): Promise<Log[]>;
  createLog(logConfigDto: CreateLogDto): Promise<Log>;
  getSubmissionIds(nodeId: string): Promise<string[]>;
}
