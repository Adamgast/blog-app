import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { Spinner } from '../../../../ui/molecules/spinner/Spinner';
import { Error } from '../../../../ui/molecules/error/Error';
import { MyPagination } from '../../../../ui/organisms/my-pagination/MyPagination';
import { fetchArticles } from '../../store/articlesSlice';
import { ArticleItem } from '../article-item/ArticleItem';
import cl from './ArticleList.module.scss';

export const ArticleList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { articles, isError, isLoading, articlesCount } = useAppSelector((state) => state.articlesData);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <Error errorText={isError} />;
  }

  const items = articles.map((article) => (
    <li key={article.createdAt} className={cl['blog-item']}>
      <ArticleItem article={article} />
    </li>
  ));

  return (
    <>
      <ul className={cl['blog-list']}>{items}</ul>
      <MyPagination page={page} setPage={setPage} articlesCount={articlesCount} />
    </>
  );
};
