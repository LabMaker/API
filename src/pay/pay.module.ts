import { Module } from '@nestjs/common';
import { PayController } from './pay.controller';
import { PayPalService } from './paypal.service';
import { PayGateway } from './pay.gateway';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from '../schemas/TicketSchema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    AuthModule,
  ],
  controllers: [PayController],
  providers: [PayPalService, PayGateway],
})
export class PayModule {}
