import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsString()
  _id: string;

  @IsString()
  nodeId: string;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  type: string;
}
