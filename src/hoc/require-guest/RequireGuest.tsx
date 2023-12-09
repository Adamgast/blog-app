import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PropsRequireAuth {
  children: ReactNode;
}

export const RequireGuest = ({ children }: PropsRequireAuth) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return <>{children}</>;
};
