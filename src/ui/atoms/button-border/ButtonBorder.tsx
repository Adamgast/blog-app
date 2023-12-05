import cl from './ButtonBorder.module.scss';

interface ButtonBorderProps {
  color?: 'red' | 'blue';
  children?: React.ReactNode;
}

export const ButtonBorder = ({ children, color }: ButtonBorderProps) => {
  return <button className={`${cl['button-border']} ${cl[`button-border_${color}`]}`}>{children}</button>;
};
