import { validTags } from './valid-tags';
import { ArticleFormValues } from '../modules/Article/models/ArticleFormValues';
import { IArticle } from '../modules/Article/models/IArticle';

export const validArticle = (data: ArticleFormValues) => {
  let tagList;
  if (data.tags) {
    tagList = validTags(data.tags);
  }
  if (typeof tagList === 'string') {
    return tagList;
  }

  const article: IArticle = {
    title: data.title,
    description: data.description,
    body: data.body,
    tagList,
  };
  return article;
};
