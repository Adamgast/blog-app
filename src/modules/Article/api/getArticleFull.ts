import type { AxiosResponse } from 'axios';
import { ArticleResponse } from '../models/response/ArticleResponse';
import { api } from '../../../http';

export const getArticleFull = async (slug: string): Promise<AxiosResponse<ArticleResponse>> => {
  const res = await api.get<ArticleResponse>(`/articles/${slug}`);
  return res;
};
