import { api } from '../../../http';

export const deleteArticle = async (slug: string) => {
  const res = await api.delete(`/articles/${slug}`);
  return res;
};
