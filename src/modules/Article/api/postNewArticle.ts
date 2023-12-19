import type { AxiosResponse } from 'axios';
import { IArticle } from '../models/IArticle';
import { ArticleResponse } from '../models/response/ArticleResponse';
import { api } from '../../../http';

export const postNewArticle = async (article: IArticle): Promise<AxiosResponse<ArticleResponse>> => {
  const body = {
    article: article,
  };
  const res = await api.post<ArticleResponse>('/articles', body);
  return res;
};
