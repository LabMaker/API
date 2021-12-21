import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  ticketId: string;

  @IsString()
  serverId: string;

  @IsString()
  channelId: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  level: string;

  @IsOptional()
  @IsString()
  budget: string;

  @IsOptional()
  @IsBoolean()
  submitted: boolean;
}
