import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { Article } from '../../../../ui/organisms/article/Article';
import { Spinner } from '../../../../ui/molecules/spinner/Spinner';
import { SkeletonArticleList } from '../../../../ui/molecules/skeleton-articleList/SkeletonArticleList';
import { Error } from '../../../../ui/molecules/error/Error';
import { MyPagination } from '../../../../ui/organisms/my-pagination/MyPagination';
import { fetchArticles } from '../../store/articlesSlice';
import cl from './ArticleList.module.scss';

export const ArticleList = () => {
  const [page, setPage] = useState(1);
  const [width] = useWindowSize();
  const dispatch = useAppDispatch();
  const { articles, isError, isLoading, articlesCount } = useAppSelector((state) => state.articlesData);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page]);

  if (isLoading) {
    if (width > 699) {
      return <SkeletonArticleList />;
    }
    return <Spinner />;
  }
  if (isError) {
    return <Error errorText={isError} />;
  }

  let pagination = <MyPagination size="default" page={page} setPage={setPage} articlesCount={articlesCount} />;
  if (width < 499) {
    pagination = <MyPagination size="small" page={page} setPage={setPage} articlesCount={articlesCount} />;
  }

  const items = articles.map((article) => (
    <li key={article.slug} className={cl['blog-item']}>
      <Article article={article} />
    </li>
  ));

  return (
    <>
      <ul className={cl['blog-list']}>{items}</ul>
      {pagination}
    </>
  );
};
