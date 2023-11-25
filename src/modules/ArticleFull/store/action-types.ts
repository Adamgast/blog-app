import { TypeArticle } from '../../../store/action-types';

export interface ArticleFullState {
  article: TypeArticle | null;
  isLoading: boolean;
  isError: string | null;
}
