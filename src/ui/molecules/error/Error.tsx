import { Alert } from 'antd';

export const Error = ({ errorText }: { errorText: string }) => {
  return (
    <div className="error">
      <Alert message="Ошибка" description={errorText} type="error" showIcon />
    </div>
  );
};
