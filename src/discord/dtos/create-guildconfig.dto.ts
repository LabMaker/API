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
  autoSwitcher: boolean;

  @IsOptional()
  @IsBoolean()
  autoTicket: boolean;

  @IsOptional()
  @IsBoolean()
  autoReact: boolean;
}

export type Guild = {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  banner?: string;
  owner_id?: string;
  roles?: Role[];
};

export type Role = {
  id: string;
  name: string;
  permissions: string;
  position: number;
  color: number;
};
