import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { Article } from '../../../../ui/organisms/article/Article';
import { Spinner } from '../../../../ui/molecules/spinner/Spinner';
import { Error } from '../../../../ui/molecules/error/Error';
import { fetchArticleFull, removeArticle } from '../../store/articleSlice';

export const ArticleFull = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { article, isError, isLoading } = useAppSelector((state) => state.articleFull);

  useEffect(() => {
    if (slug) dispatch(fetchArticleFull(slug));
  }, [dispatch, slug]);

  const onRemoveArticle = async () => {
    if (slug) {
      const result = await dispatch(removeArticle(slug));
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <Error errorText={isError} />;
  }

  return <Article slug={slug} username={currentUser?.username} article={article} onRemoveArticle={onRemoveArticle} />;
};
