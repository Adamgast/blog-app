import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { ILogin } from '../models/ILogin';
import { API_URL } from '../../../http';

export const login = async (user: ILogin): Promise<AxiosResponse<UserResponse>> => {
  const body = {
    user: user,
  };
  const response = await axios.post<UserResponse>(`${API_URL}/users/login`, body);
  return response;
};
