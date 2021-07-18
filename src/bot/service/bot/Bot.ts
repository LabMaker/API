import { configDetails, LogDetails } from 'src/bot/types/types';

export interface IBotService {
  getSubmissions();

  getLogs();
  createLog(log: LogDetails);

  getConfig();
  getDiscordConfig();
  updateConfig(ConfigDto: configDetails);
  updateMessage(pmBody: String);
}
