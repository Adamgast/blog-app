import cl from './ButtonFull.module.scss';

interface ButtonFullProps {
  color?: 'red';
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const ButtonFull = ({ disabled, children, color, type = 'button' }: ButtonFullProps) => {
  return (
    <button disabled={disabled} type={type} className={`${cl['button-full']} ${cl[`button-full_${color}`]}`}>
      {children}
    </button>
  );
};
