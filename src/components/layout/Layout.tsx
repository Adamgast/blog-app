import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { checkAuth } from '../../modules/User/store/userSlice';
import { Header } from '../../ui/organisms/header/Header';
import cl from './Layout.module.scss';

export const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <div className={cl.blog}>
      <Header titleText="Realworld Blog" />
      <main className={cl['blog-main']}>
        <Outlet />
      </main>
    </div>
  );
};
