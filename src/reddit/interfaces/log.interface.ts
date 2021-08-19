import { Log } from '../../schemas/LogSchema';
import { CreateLogDto } from '../dtos/create-log.dto';

export interface ILog {
  getLogs(nodeId: string): Promise<Log[]>;
  createLog(logConfigDto: CreateLogDto): Promise<Log>;
  getSubmissionIds(nodeId: string): Promise<string[]>;
}
