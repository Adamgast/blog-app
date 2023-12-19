import { ArticleForm } from '../../../../ui/organisms/article-form/ArticleForm';
import { ArticleFormValues } from '../../models/ArticleFormValues';

export const NewArticle = () => {
  const defaultValues: ArticleFormValues = {
    title: '',
    description: '',
    body: '',
    tags: [{ name: '' }],
  };

  return <ArticleForm defaultValues={defaultValues} />;
};
