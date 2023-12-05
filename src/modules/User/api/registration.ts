import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { IRegist } from '../models/IRegist';

export const registration = async (user: IRegist): Promise<AxiosResponse<UserResponse>> => {
  const config = {
    user: user,
  };
  const response = await axios.post<UserResponse>('https://blog.kata.academy/api/users', config);
  return response;
};
