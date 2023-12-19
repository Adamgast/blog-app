import { Alert } from 'antd';
import cl from './Error.module.scss';

export const Error = ({ errorText }: { errorText: string }) => {
  return (
    <div className={cl.error}>
      <Alert message="Ошибка" description={errorText} type="error" showIcon closeIcon />
    </div>
  );
};
