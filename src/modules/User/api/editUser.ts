import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { UserResponse } from '../models/response/UserResponse';
import { IProfile } from '../models/IProfile';

export const editUser = async (user: IProfile): Promise<AxiosResponse<UserResponse>> => {
  const config = {
    user: user,
  };
  const response = await axios.put<UserResponse>('https://blog.kata.academy/api/user', config, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response;
};
