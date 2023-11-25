import { TypeArticle } from '../../../store/action-types';

export interface IArticlesData {
  articles: TypeArticle[];
  articlesCount: number;
}

export interface ArticlesState extends IArticlesData {
  isLoading: boolean;
  isError: string | null;
}
