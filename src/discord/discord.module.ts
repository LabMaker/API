import { Module } from '@nestjs/common';
import {
  DiscordConfig,
  DiscordConfigSchema,
} from '../schemas/DiscordConfigSchema';
import { ConfigController } from './controllers/config.controller';
import { ConfigService } from './services/config.service';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { Payment, PaymentSchema } from '../schemas/PaymentSchema';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { Ticket, TicketSchema } from '../schemas/TicketSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: DiscordConfig.name, schema: DiscordConfigSchema },
      { name: Ticket.name, schema: TicketSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [ConfigController, TicketController, PaymentController],
  providers: [
    {
      provide: 'DISCORD_CONFIG_SERVICE',
      useClass: ConfigService,
    },
    {
      provide: 'TICKET_SERVICE',
      useClass: TicketService,
    },
    {
      provide: 'PAYMENT_SERVICE',
      useClass: PaymentService,
    },
  ],
})
export class DiscordModule {}
