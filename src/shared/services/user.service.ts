import http from '../../http-common';
import { AxiosResponse } from 'axios';
import { User, UserPosition } from '../../types';

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
  users: User[];
}

interface UserPositionsResponse {
  success: boolean;
  positions: UserPosition[];
}

class UserServices {
  getUsers(next_url = '?page=1&count=6'): Promise<AxiosResponse<UserResponse>> {
    return http.get(`/users${next_url}`);
  }

  createUser(data: User): Promise<AxiosResponse<User>> {
    return http.post('/user', data);
  }

  getUserPositions(): Promise<AxiosResponse<UserPositionsResponse>> {
    return http.get(`/positions`);
  }
}

export default new UserServices();