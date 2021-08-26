import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  _id: string;

  @IsString()
  username: string;

  @IsString()
  discriminator: string;

  @IsString()
  avatar: string;

  @IsString({ each: true })
  nodes: string[];
}
