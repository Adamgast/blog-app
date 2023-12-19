import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useValidImage } from '../../../hooks/useValidImage';
import { logout } from '../../../modules/User/store/userSlice';
import { ButtonBorder } from '../../atoms/button-border/ButtonBorder';
import cl from './Header.module.scss';

interface HeaderProps {
  titleText: string;
}

export const Header = ({ titleText }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const src = useValidImage(currentUser?.image);

  const handleLogout = () => {
    dispatch(logout());
  };

  const defaultContent = (
    <>
      <Link to="/sign-in" className={`${cl['header-button']} ${cl['header-buttonDark']}`}>
        Sign in
      </Link>
      <Link to="/sign-up" className={`${cl['header-button']} ${cl['header-button_green']}`}>
        Sign up
      </Link>
    </>
  );

  const authContent = (
    <>
      <Link to="/new-article">
        <ButtonBorder min color="green">
          Create article
        </ButtonBorder>
      </Link>
      <Link to="/profile">
        <div className={cl['header-user']}>
          <span>{currentUser?.username}</span>
          <img src={src} alt="avatar" />
        </div>
      </Link>
      <Link to="/">
        <button onClick={handleLogout} className={`${cl['header-button']} ${cl['header-button_black']}`}>
          Log Out
        </button>
      </Link>
    </>
  );

  return (
    <header className={cl.header}>
      <Link className={cl['header-title']} to="/">
        {titleText}
      </Link>
      <div className={cl['header-actions']}>{localStorage.getItem('token') ? authContent : defaultContent}</div>
    </header>
  );
};
