import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserDetails } from '../auth/dtos/UserDetails.dto';
import { Guild } from '../discord/dtos/create-guildconfig.dto';

export interface IUser {
  getUser(id: string): Promise<UserDetails>;
  fetchGuilds(accessToken: string): Observable<AxiosResponse<any[]>>;
}
