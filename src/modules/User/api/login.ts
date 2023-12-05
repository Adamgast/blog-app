import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { ILogin } from '../models/ILogin';

export const login = async (user: ILogin): Promise<AxiosResponse<UserResponse>> => {
  const config = {
    user: user,
  };
  const response = await axios.post<UserResponse>('https://blog.kata.academy/api/users/login', config);
  return response;
};
