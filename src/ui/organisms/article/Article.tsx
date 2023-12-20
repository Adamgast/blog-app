import { useState } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Popconfirm, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { useValidImage } from '../../../hooks/useValidImage';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { TypeArticle } from '../../../store/action-types';
import { likeArticle, unLikeArticle } from '../../../modules/Article/store/articleSlice';
import { formatDate } from '../../../utils/format-date';
import { formatText } from '../../../utils/format-text';
import { ButtonBorder } from '../../atoms/button-border/ButtonBorder';
import { ReactComponent as Heart } from '../../../assets/svg/heart.svg';
import { ReactComponent as RedHeart } from '../../../assets/svg/red-heart.svg';
import cl from './Article.module.scss';

interface ArticleProps {
  full?: boolean;
  onRemoveArticle?: () => void;
  article: TypeArticle | null;
}

export const Article = ({ full, onRemoveArticle, article }: ArticleProps) => {
  const [like, setLike] = useState(article?.favorited);
  const [likeCount, setLikeCount] = useState(article?.favoritesCount);

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const src = useValidImage(article?.author.image);

  const handleLike = () => {
    if (currentUser?.username && article?.slug) {
      if (like) {
        dispatch(unLikeArticle(article?.slug));
        setLike(false);
        if (typeof likeCount === 'number') setLikeCount(likeCount - 1);
      } else {
        dispatch(likeArticle(article?.slug));
        setLike(true);
        if (typeof likeCount === 'number') setLikeCount(likeCount + 1);
      }
    }
  };

  const isMyPost = () => currentUser?.username === article?.author.username;
  const myPostActions = (
    <div className={cl['article-btns']}>
      <Popconfirm
        placement="rightTop"
        title=""
        description="Are you sure to delete this article?"
        onConfirm={onRemoveArticle}
        okText="Yes"
        cancelText="No"
      >
        <ButtonBorder min color="red">
          Delete
        </ButtonBorder>
      </Popconfirm>
      <Link to={`/articles/${article?.slug}/edit`}>
        <ButtonBorder min color="green">
          Edit
        </ButtonBorder>
      </Link>
    </div>
  );

  const title = (
    <Link to={`/articles/${article?.slug}`} className={cl['article-link']}>
      {formatText(article?.title, 50)}
    </Link>
  );
  const description = formatText(article?.description, 200);
  const likeBtn = currentUser?.username ? (
    <button onClick={handleLike}>{like ? <RedHeart /> : <Heart className={cl['article-like']} />}</button>
  ) : (
    <Tooltip title="Please login to like!">
      <button onClick={handleLike}>
        <Heart className={cl['article-like']} />
      </button>
    </Tooltip>
  );

  const tags = article?.tagList.map((tag) => (
    <li key={uuidv4()} className={cl['article-tag']}>
      {formatText(tag, 100)}
    </li>
  ));

  return (
    <article className={cl.article}>
      <div className={cl['article-body']}>
        <div className={cl['article-top']}>
          <div className={cl['article-head']}>
            <h2 className={cl['article-title']}>{full ? article?.title : title}</h2>
            <div className={cl['article-likes']}>
              {likeBtn}
              <span>{likeCount}</span>
            </div>
          </div>
          <ul className={cl['article-tags']}>{tags}</ul>
          <div className={cl['article-text']}>{full ? article?.description : description}</div>
        </div>
        <div className={cl['article-bottom']}>
          <div className={cl['article-user']}>
            <div className={cl['article-info']}>
              <div className={cl['article-name']}>{article?.author.username}</div>
              <div className={cl['article-date']}>{formatDate(article?.createdAt)}</div>
            </div>
            <div className={cl['article-avatar']}>
              <img src={src} alt="avatar" />
            </div>
          </div>
          {full && isMyPost() && myPostActions}
        </div>
      </div>
      {full && <Markdown className={cl['article-markdown']}>{article?.body}</Markdown>}
    </article>
  );
};
