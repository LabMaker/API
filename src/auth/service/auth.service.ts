import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/UsersSchema';
import { UserDetails } from '../dtos/UserDetails.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>) {}

  async validateUser(details: UserDetails) {
    const { discordId } = details;
    const user = await this.userRepo.findOne({ discordId });

    if (user) {
      await this.userRepo.findOneAndUpdate({ discordId }, details, {
        new: true,
      });
      console.log('Updated');
      return user;
    }

    return this.createUser(details);
  }

  async createUser(details: UserDetails) {
    const _id = uuidv4();

    const createdUser = new this.userRepo({ ...details, _id });
    return await createdUser.save();
  }

  async findUser(discordId: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ discordId });
  }
}
