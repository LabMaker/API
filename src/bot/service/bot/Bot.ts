import { configDetails, LogDetails, PaymentDetails } from 'src/bot/types/types';

export interface IBotService {
  getSubmissions();

  getLogs();
  createLog(log: LogDetails);

  getConfig();
  getPayments();

  updateConfig(ConfigDto: configDetails);
  updateMessage(pmBody: String);
  updatePayments(paymentDto: PaymentDetails);
}
