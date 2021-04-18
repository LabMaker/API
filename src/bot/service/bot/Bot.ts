import { configDetails, LogDetails } from 'src/bot/types/types';

export interface IBotService {
  getSubmissions();

  getLogs();
  createLog(log: LogDetails);
  getConfig();
  updateConfig(ConfigDto: configDetails);
}
