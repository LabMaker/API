import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  serverId: string;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  type: string;
}
