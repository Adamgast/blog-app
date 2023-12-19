import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PropsRequireAuth {
  children: ReactNode;
}

export const RequireGuest = ({ children }: PropsRequireAuth) => {
  const isAuth = localStorage.getItem('token');

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
