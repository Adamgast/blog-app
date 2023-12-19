import cl from './ContainerForm.module.scss';

interface ContainerFormProps {
  children?: React.ReactNode;
  onSubmit?: () => void;
  mobile?: boolean;
}

export const ContainerForm = ({ children, onSubmit, mobile }: ContainerFormProps) => {
  const mobileClass = mobile ? 'form-container-mb' : '';
  return (
    <div className={cl['form-center']}>
      <form className={`${cl['form-container']} ${cl[mobileClass]}`} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};
