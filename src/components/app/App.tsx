import { Routes, Route, Navigate } from 'react-router-dom';
import { ArticleList } from '../../modules/ArticleList';
import { ArticleFull, EditArticle, NewArticle } from '../../modules/Article';
import { LoginForm, Profile, RegistrationForm } from '../../modules/User';
import { RequireAuth } from '../../hoc/require-auth/RequireAuth';
import { RequireGuest } from '../../hoc/require-guest/RequireGuest';
import { Layout } from '../layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="articles" element={<Navigate to="/" />} />
        <Route path="articles/:slug" element={<ArticleFull />} />
        <Route
          path="sign-up"
          element={
            <RequireGuest>
              <RegistrationForm />
            </RequireGuest>
          }
        />
        <Route
          path="sign-in"
          element={
            <RequireGuest>
              <LoginForm />
            </RequireGuest>
          }
        />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <NewArticle />
            </RequireAuth>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
