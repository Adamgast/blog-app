import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { logout } from '../../../modules/User/store/userSlice';
import defaultavatar from '../../../assets/images/avatar.png';
import cl from './Header.module.scss';

interface HeaderProps {
  titleText: string;
}

export const Header = ({ titleText }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { currentUser, isAuth } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const defaultContent = (
    <>
      <Link to="/sign-in">
        <button className={`${cl['header-button']} ${cl['header-buttonDark']}`}>Sign in</button>
      </Link>
      <Link to="/sign-up">
        <button className={`${cl['header-button']} ${cl['header-button_green']}`}>Sign up</button>
      </Link>
    </>
  );

  const authContent = (
    <>
      <Link to="/">
        <button className={`${cl['header-button']} ${cl['header-button_green']} ${cl.smallBtn}`}>Create article</button>
      </Link>
      <Link to="/profile">
        <div className={cl['header-user']}>
          <span>{currentUser?.username}</span>
          <img src={currentUser?.image || defaultavatar} alt="avatar" />
        </div>
      </Link>
      <Link to="/sign-in">
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
      <div className={cl['header-actions']}>{isAuth ? authContent : defaultContent}</div>
    </header>
  );
};
