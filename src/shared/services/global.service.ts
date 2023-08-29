import http from '../../http-common';
import { AxiosResponse } from 'axios';
import { Token } from '../../types';

class GlobalServices {
  getToken(): Promise<AxiosResponse<Token>> {
    return http.get('/token');
  }
}

export default new GlobalServices();