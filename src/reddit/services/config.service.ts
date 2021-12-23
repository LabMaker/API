import { RedditConfig } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UserDetails } from '../../auth/userDetails.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConfigDto } from '../dtos/create-redditconfig.dto';
import { UpdateConfigDto } from '../dtos/update-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService implements IRedditConfig {
  constructor(
    private prismaService: PrismaService,
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {}

  async getConfig(id: number): Promise<RedditConfig> {
    //Send Back X Amount OF Logs
    //Not Sure if You can filter Logs Like This in Relationships (Could Manually Query Logs Instead?)
    // let configs =  await this.prismaService.redditConfig.findUnique({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     _count: {
    //       select: {
    //         logs: true,
    //       },
    //     },
    //   },
    // });

    return await this.prismaService.redditConfig.findUnique({
      where: {
        id,
      },
    });
  }

  async getConfigs(user: UserDetails): Promise<RedditConfig[]> {
    if (user.type !== 'Bot') throw new UnauthorizedException();
    Logger.log('Reddit Bot Client Requesting Configs', 'Config');

    return await this.prismaService.redditConfig.findMany();
  }

  async createConfig(newConfig: CreateConfigDto): Promise<RedditConfig> {
    Logger.log(JSON.stringify(newConfig), 'RedditConfig');
    try {
      return await this.prismaService.redditConfig.create({
        data: newConfig,
      });
    } catch (err) {
      Logger.error(err, 'Config');
      return;
    }
  }

  async updateConfig(updateConfigDto: UpdateConfigDto): Promise<any> {
    const filter = { id: updateConfigDto.id };

    return await this.prismaService.redditConfig.update({
      where: filter,
      data: updateConfigDto,
    });
  }

  async updateMessage(id: number, message: string): Promise<any> {
    return await this.prismaService.redditConfig.update({
      where: { id },
      data: { pmBody: message },
    });
  }

  async deleteConfig(id: number): Promise<any> {
    await this.prismaService.redditConfig.delete({ where: { id } });
    return;
  }

  //Fix Function
  async getProfile(username: string): Promise<any> {
    const xPathValue = `//*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[2]/div/div/div/div[2]/div[3]/div[2]/div/div[1]/div/div[2]/img`;
    // const htmlPage = this.httpService
    // .get(`https://reddit.com/user/${username}`)
    // .pipe(map((response) => response.data));

    const data = this.httpService.get(`https://reddit.com/user/${username}`);
    const htmlPage = await (await lastValueFrom(data)).data;

    // Logger.log(data);

    return htmlPage;
    //*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[2]/div/div/div/div[2]/div[3]/div[2]/div/div[1]/div/div[2]/img
  }
}
