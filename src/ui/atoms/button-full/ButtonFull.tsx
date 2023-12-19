import cl from './ButtonFull.module.scss';

interface ButtonFullProps {
  color?: 'red';
  min?: 'min';
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const ButtonFull = ({ min, disabled, children, color, type = 'button' }: ButtonFullProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${cl['button-full']} ${cl[`button-full_${color}`]} ${cl[`button-full_${min}`]}`}
    >
      {children}
    </button>
  );
};
