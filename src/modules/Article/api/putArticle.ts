import type { AxiosResponse } from 'axios';
import { IArticle } from '../models/IArticle';
import { ArticleResponse } from '../models/response/ArticleResponse';
import { api } from '../../../http';

export const putArticle = async (slug: string, article: IArticle): Promise<AxiosResponse<ArticleResponse>> => {
  const body = {
    article: article,
  };
  const res = await api.put<ArticleResponse>(`/articles/${slug}`, body);
  return res;
};
