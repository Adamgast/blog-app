import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PropsRequireAuth {
  children: ReactNode;
}

export const RequireAuth = ({ children }: PropsRequireAuth) => {
  const isAuth = localStorage.getItem('token');

  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};
