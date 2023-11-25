import { ArticleList } from '../../modules/ArticleList';
import { Routes, Route } from 'react-router-dom';
import { ArticleFull } from '../../modules/ArticleFull/components/article-full/ArticleFull';
import { Layout } from '../layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:slug" element={<ArticleFull />} />
      </Route>
    </Routes>
  );
};

export default App;
