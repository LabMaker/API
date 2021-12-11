import { Module } from '@nestjs/common';
import { PayController } from './pay.controller';
import { PayPalService } from './paypal.service';

@Module({
  controllers: [PayController],
  providers: [PayPalService],
})
export class PayModule {}
