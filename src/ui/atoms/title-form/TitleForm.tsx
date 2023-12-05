import cl from './TitleForm.module.scss';

interface TitleFormProps {
  children?: React.ReactNode;
}

export const TitleForm = ({ children }: TitleFormProps) => {
  return <h2 className={cl['title-form']}>{children}</h2>;
};
