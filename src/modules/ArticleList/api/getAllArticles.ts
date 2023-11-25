import axios from 'axios';

export const getAllArticles = async (page: number) => {
  const validPage = (page - 1) * 5;
  const res = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${validPage}`);
  return res;
};
