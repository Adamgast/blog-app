import { TypeArticle } from '../../../store/action-types';

export interface ArticleState {
  article: TypeArticle | null;
  isLoading: boolean;
  isError: string | null;
}

export interface IArticleFields {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}
