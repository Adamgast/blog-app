import { api } from '../../../http';

export const getAllArticles = async (page: number) => {
  const validPage = (page - 1) * 5;
  const res = await api.get('/articles', { params: { limit: 5, offset: validPage } });
  return res;
};
