import cl from './ContainerForm.module.scss';

interface ContainerFormProps {
  children?: React.ReactNode;
  onSubmit?: () => void;
}

export const ContainerForm = ({ children, onSubmit }: ContainerFormProps) => {
  return (
    <div className={cl['form-center']}>
      <form className={cl['form-container']} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};
