import { useEffect } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useValidAvatar } from '../../../../hooks/useValidAvatar';
import { Spinner } from '../../../../ui/molecules/spinner/Spinner';
import { Error } from '../../../../ui/molecules/error/Error';
import { fetchArticleFull } from '../../store/articleFullSlice';
import { formatDate } from '../../../../utils/format-date';
import { ReactComponent as Heart } from '../../../../assets/svg/heart.svg';
import cl from './ArticleFull.module.scss';

export const ArticleFull = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { article, isError, isLoading } = useAppSelector((state) => state.articleFull);
  const src = useValidAvatar(article?.author.image);

  useEffect(() => {
    if (slug) dispatch(fetchArticleFull(slug));
  }, [dispatch, slug]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <Error errorText={isError} />;
  }

  const tags = article?.tagList.map((tag, i) => (
    <li key={i + 2} className={cl['article-tag']}>
      {tag}
    </li>
  ));

  return (
    <article className={cl.article}>
      <div className={cl['article-top']}>
        <div className={cl['article-data']}>
          <div className={cl['article-head']}>
            <h2 className={cl['article-title']}>{article?.title}</h2>
            <div className={cl['article-likes']}>
              <Heart /> <span>{article?.favoritesCount}</span>
            </div>
          </div>
          <ul className={cl['article-tags']}>{tags}</ul>
          <div className={cl['article-text']}>{article?.description}</div>
        </div>
        <div className={cl['article-profile']}>
          <div className={cl['article-info']}>
            <div className={cl['article-name']}>{article?.author.username}</div>
            <div className={cl['article-date']}>{formatDate(article?.createdAt)}</div>
          </div>
          <div className={cl['article-avatar']}>
            <img src={src} alt="avatar" />
          </div>
        </div>
      </div>
      <Markdown className={cl['article-markdown']}>{article?.body}</Markdown>
    </article>
  );
};
