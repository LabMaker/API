import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateConfigDto {
  @IsString()
  _id: string;

  @IsString()
  paymentConfigId: string;

  @IsOptional()
  @IsString()
  prefix: string;

  @IsOptional()
  @IsString()
  embedImageUrl: string;

  @IsOptional()
  @IsBoolean()
  autoSwitcher: Boolean;

  @IsOptional()
  @IsBoolean()
  autoTicket: Boolean;

  @IsOptional()
  @IsBoolean()
  autoReact: Boolean;
}
