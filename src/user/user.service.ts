import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { UserDetails } from '../auth/userDetails.dto';
import { User, UserDocument } from '../schemas/UserSchema';
import { UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectModel(User.name) private userRepo: Model<UserDocument>,
  ) {}

  async getUser(userDetails: UserDetails): Promise<UserDto> {
    const user = await this.userRepo.findById(userDetails._id);

    const fetchedUser = this.httpService.get(
      `https://discord.com/api/v9/users/@me`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );
    const discordUser = await (await lastValueFrom(fetchedUser)).data;
    await this.userRepo.findOneAndUpdate({ _id: discordUser.id }, discordUser, {
      useFindAndModify: false,
    });

    console.log(discordUser);

    return {
      _id: user._id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      nodes: user.nodes,
    };
  }

  async getUserDetails(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);

    return user;
  }
}
