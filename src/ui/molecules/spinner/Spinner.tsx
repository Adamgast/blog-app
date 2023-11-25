import { Spin } from 'antd';
import cl from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={cl.spinner}>
      <Spin />
    </div>
  );
};
