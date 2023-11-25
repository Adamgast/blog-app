import axios from 'axios';

export const getArticleFull = async (slug: string) => {
  const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
  return res;
};
