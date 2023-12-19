import cl from './ButtonBorder.module.scss';

interface ButtonBorderProps {
  color?: 'red' | 'blue' | 'green';
  children?: React.ReactNode;
  min?: boolean;
  onClick?: () => void;
}

export const ButtonBorder = ({ children, color, onClick, min }: ButtonBorderProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${cl['button-border']} ${cl[`button-border_${color}`]} ${min ? cl.smallBtn : ''}`}
    >
      {children}
    </button>
  );
};
