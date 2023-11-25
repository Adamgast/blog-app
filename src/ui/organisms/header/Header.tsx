import { Link } from 'react-router-dom';
import cl from './Header.module.scss';

interface HeaderProps {
  titleText: string;
  btn1Text?: string;
  btn2Text?: string;
}

export const Header = ({ titleText, btn1Text, btn2Text }: HeaderProps) => {
  const content = (
    <>
      <button className={`${cl['header-button']} ${cl['header-button_dark']}`}>{btn1Text}</button>
      <button className={`${cl['header-button']} ${cl['header-button_green']}`}>{btn2Text}</button>
    </>
  );

  return (
    <header className={cl.header}>
      <Link to="/">{titleText}</Link>
      <div className={cl['header-actions']}>{content}</div>
    </header>
  );
};
