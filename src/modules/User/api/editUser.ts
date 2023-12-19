import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { IProfile } from '../models/IProfile';
import { api } from '../../../http';

export const editUser = async (user: IProfile): Promise<AxiosResponse<UserResponse>> => {
  const body = {
    user: user,
  };
  const response = await api.put<UserResponse>('/user', body);
  return response;
};
