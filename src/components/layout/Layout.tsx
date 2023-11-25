import { Outlet } from 'react-router-dom';
import { Header } from '../../ui/organisms/header/Header';
import cl from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={cl.blog}>
      <Header titleText="Realworld Blog" btn1Text="Sign in" btn2Text="Sign up" />
      <main className={cl['blog-main']}>
        <Outlet />
      </main>
    </div>
  );
};
