import http from '../../http-common';
import { AxiosResponse } from 'axios';
import { UserGet, UserCreate, UserPosition } from '../../types';

interface UserResponseLinks {
  next_url: string,
  prev_url: string
}

interface UserResponse {
  count: number;
  links: UserResponseLinks;
  page: number;
  success: boolean;
  total_pages: number;
  total_users: number;
  users: UserGet[];
}

interface UserPositionsResponse {
  success: boolean;
  positions: UserPosition[];
}

interface UserConfig {
  Token: string,
}

class UserServices {  
  getUsers(next_url = '?page=1&count=6'): Promise<AxiosResponse<UserResponse>> {
    return http.get(`/users${next_url}`);
  }

  createUser(data: FormData, config: UserConfig): Promise<AxiosResponse<UserCreate>> {

    const requestConfig = {
      headers: {
        Token: config.Token
      }
    };

    return http.post('/users', data, requestConfig);
  }

  getUserPositions(): Promise<AxiosResponse<UserPositionsResponse>> {
    return http.get(`/positions`);
  }
}

export default new UserServices();