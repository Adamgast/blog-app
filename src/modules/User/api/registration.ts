import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { IRegist } from '../models/IRegist';

export const registration = async (user: IRegist): Promise<AxiosResponse<UserResponse>> => {
  const config = {
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  };
  const response = await axios.post<UserResponse>('https://blog.kata.academy/api/users', config);
  return response;
};
