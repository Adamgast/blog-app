import { Link } from 'react-router-dom';
import { useValidAvatar } from '../../../../hooks/useValidAvatar';
import { TypeArticle } from '../../../../store/action-types';
import { formatDate } from '../../../../utils/format-date';
import { ReactComponent as Heart } from '../../../../assets/svg/heart.svg';
import cl from './ArticleItem.module.scss';

export const ArticleItem = ({ article }: { article: TypeArticle }) => {
  const src = useValidAvatar(article.author.image);

  const tags = article.tagList.map((tag, i) => (
    <li key={i + 2} className={cl['article-tag']}>
      {tag}
    </li>
  ));

  return (
    <article className={cl.article}>
      <div className={cl['article-data']}>
        <div className={cl['article-head']}>
          <Link to={`/articles/${article.slug}`} className={`${cl['article-title']} ${cl['custom-scrollbar']}`}>
            {article.title}
          </Link>
          <div className={cl['article-likes']}>
            <Heart /> <span>{article.favoritesCount}</span>
          </div>
        </div>
        <ul className={`${cl['article-tags']} ${cl['custom-scrollbar']}`}>{tags}</ul>
        <div className={`${cl['article-text']} ${cl['custom-scrollbar']}`}>{article.description}</div>
      </div>
      <div className={cl['article-profile']}>
        <div className={cl['article-info']}>
          <div className={cl['article-name']}>{article.author.username}</div>
          <div className={cl['article-date']}>{formatDate(article.createdAt)}</div>
        </div>
        <div className={cl['article-avatar']}>
          <img src={src} alt="avatar" />
        </div>
      </div>
    </article>
  );
};
