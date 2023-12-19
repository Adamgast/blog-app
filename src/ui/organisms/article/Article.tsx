import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { useValidImage } from '../../../hooks/useValidImage';
import { TypeArticle } from '../../../store/action-types';
import { formatDate } from '../../../utils/format-date';
import { formatText } from '../../../utils/format-text';
import { ButtonBorder } from '../../atoms/button-border/ButtonBorder';
import { ReactComponent as Heart } from '../../../assets/svg/heart.svg';
import cl from './Article.module.scss';

interface ArticleProps {
  slug?: string;
  username?: string;
  onRemoveArticle?: () => void;
  article: TypeArticle | null;
}

export const Article = ({ slug, username, onRemoveArticle, article }: ArticleProps) => {
  const src = useValidImage(article?.author.image);

  const isMyPost = () => username === article?.author.username;
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
      <Link to={`/articles/${slug}/edit`}>
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

  const tags = article?.tagList.map((tag, i) => (
    <li key={i + 2} className={cl['article-tag']}>
      {formatText(tag, 100)}
    </li>
  ));

  return (
    <article className={cl.article}>
      <div className={cl['article-body']}>
        <div className={cl['article-top']}>
          <div className={cl['article-head']}>
            <h2 className={cl['article-title']}>{slug ? article?.title : title}</h2>
            <div className={cl['article-likes']}>
              <Heart /> <span>{article?.favoritesCount}</span>
            </div>
          </div>
          <ul className={cl['article-tags']}>{tags}</ul>
          <div className={cl['article-text']}>{slug ? article?.description : description}</div>
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
          {isMyPost() && myPostActions}
        </div>
      </div>
      {slug && <Markdown className={cl['article-markdown']}>{article?.body}</Markdown>}
    </article>
  );
};
