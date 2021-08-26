import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserDto } from './dto/User.dto';

export interface IUser {
  getUser(id: string): Promise<UserDto>;
  fetchGuilds(accessToken: string): Observable<AxiosResponse<any[]>>;
}
