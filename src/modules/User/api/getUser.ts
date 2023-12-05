import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';

export const getUser = async (): Promise<AxiosResponse<UserResponse>> => {
  const response = await axios.get<UserResponse>('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response;
};
