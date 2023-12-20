import type { AxiosResponse } from 'axios';
import { ArticleResponse } from '../models/response/ArticleResponse';
import { api } from '../../../http';

export const postLikeArticle = async (slug: string): Promise<AxiosResponse<ArticleResponse>> => {
  const res = await api.post<ArticleResponse>(`/articles/${slug}/favorite`);
  return res;
};
