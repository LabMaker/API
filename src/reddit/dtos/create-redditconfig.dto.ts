import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConfigDto {
  @IsOptional()
  @IsString()
  _id: string;

  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  userAgent: string;

  @IsString()
  title: string;

  @IsString()
  pmBody: string;

  @IsString({ each: true })
  @IsNotEmpty()
  subreddits: string[];

  @IsOptional()
  @IsString({ each: true })
  forbiddenWords: string[];

  @IsOptional()
  @IsString({ each: true })
  blockedUsers: string[];
}
