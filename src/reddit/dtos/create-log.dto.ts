import { IsBoolean, IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  _id: string;

  @IsString()
  nodeId: string;

  @IsString()
  message: string;

  @IsString()
  subId: string;

  @IsString()
  username: string;

  @IsString()
  subreddit: string;

  @IsBoolean()
  pm: Boolean;
}
