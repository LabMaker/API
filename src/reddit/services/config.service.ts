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
import {
  CreateConfigDto,
  UpdateConfigDto,
} from '../dtos/create-redditconfig.dto';
import { IRedditConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService implements IRedditConfig {
  constructor(
    private prismaService: PrismaService,
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {}
  private readonly logger = new Logger(ConfigService.name);

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
    this.logger.log('Reddit Bot Client Requesting Configs');

    return await this.prismaService.redditConfig.findMany();
  }

  async createConfig(newConfig: CreateConfigDto): Promise<RedditConfig> {
    this.logger.log(JSON.stringify(newConfig));
    try {
      return await this.prismaService.redditConfig.create({
        data: newConfig,
      });
    } catch (err) {
      this.logger.error(err);
      return;
    }
  }

  async updateConfig(ucd: UpdateConfigDto): Promise<any> {
    const filter = { id: ucd.id };
    ucd.nodeEditors = ucd.nodeEditors.filter((userId) => userId !== ucd.userId);

    ucd.nodeEditors = [...new Set(ucd.nodeEditors)];
    return await this.prismaService.redditConfig.update({
      where: filter,
      data: ucd,
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

    // this.logger.log(data);

    return htmlPage;
    //*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[2]/div/div/div/div[2]/div[3]/div[2]/div/div[1]/div/div[2]/img
  }
}
