import cl from './Label.module.scss';

interface LabelProps {
  children?: React.ReactNode;
  id?: string;
}

export const Label = ({ children, id }: LabelProps) => {
  return (
    <label htmlFor={id} className={cl.label}>
      {children}
    </label>
  );
};
