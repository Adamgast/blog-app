import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { IRegist } from '../models/IRegist';
import { API_URL } from '../../../http';

export const registration = async (user: IRegist): Promise<AxiosResponse<UserResponse>> => {
  const body = {
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  };
  const response = await axios.post<UserResponse>(`${API_URL}/users`, body);
  return response;
};
