import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateConfigDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  prefix: string;

  @IsOptional()
  @IsString()
  embedImageUrl: string;

  @IsString()
  paymentConfigId: string;

  @IsOptional()
  @IsBoolean()
  autoSwitcher: boolean;

  @IsOptional()
  @IsBoolean()
  autoTicket: boolean;

  @IsOptional()
  @IsBoolean()
  autoReact: boolean;
}
