import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { classToClass, plainToClass, serialize } from 'class-transformer';
import { Model } from 'mongoose';
import { Transform } from 'stream';
import { User, UserDocument } from '../schemas/UserSchema';
import { UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>) {}

  async getUser(id: string): Promise<UserDto> {
    const user: UserDto = await this.userRepo.findById(id);

    return {
      _id: user._id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      nodes: user.nodes,
    };
  }
}
