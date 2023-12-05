import { Routes, Route } from 'react-router-dom';
import { ArticleList } from '../../modules/ArticleList';
import { ArticleFull } from '../../modules/ArticleFull';
import { LoginForm, Profile, RegistrationForm } from '../../modules/User';
import { Layout } from '../layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:slug" element={<ArticleFull />} />
        <Route path="sign-up" element={<RegistrationForm />} />
        <Route path="sign-in" element={<LoginForm />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
