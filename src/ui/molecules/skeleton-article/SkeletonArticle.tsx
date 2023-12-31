import ContentLoader from 'react-content-loader';
import cl from './SkeletonArticle.module.scss';

export const SkeletonArticle = () => (
  <ContentLoader
    rtl
    speed={2}
    className={cl.loader}
    viewBox="0 0 980 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="20" cy="20" r="20" />
    <rect x="45" y="25" rx="3" ry="3" width="123" height="12" />
    <rect x="940" y="25" rx="3" ry="3" width="40" height="10" />
    <rect x="810" y="8" rx="3" ry="3" width="170" height="10" />
    <rect x="710" y="42" rx="3" ry="3" width="270" height="15" />
    <rect x="890" y="25" rx="3" ry="3" width="40" height="10" />
    <rect x="840" y="25" rx="3" ry="3" width="40" height="10" />
    <rect x="45" y="5" rx="3" ry="3" width="123" height="12" />
    <rect x="0" y="65" rx="3" ry="3" width="100%" height="20" />
  </ContentLoader>
);
