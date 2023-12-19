import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { api } from '../../../http';

export const getUser = async (): Promise<AxiosResponse<UserResponse>> => {
  const response = await api.get<UserResponse>('/user');
  return response;
};
