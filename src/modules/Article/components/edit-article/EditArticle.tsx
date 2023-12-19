import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { ArticleForm } from '../../../../ui/organisms/article-form/ArticleForm';
import { ArticleFormValues } from '../../models/ArticleFormValues';

export const EditArticle = () => {
  const { slug } = useParams();
  const { article } = useAppSelector((state) => state.articleFull);

  const tags = article?.tagList.map((tag) => ({
    name: tag,
  }));

  const defaultValues: ArticleFormValues = {
    title: article?.title || '',
    description: article?.description || '',
    body: article?.body || '',
    tags: tags,
  };

  return <ArticleForm slug={slug} defaultValues={defaultValues} />;
};
