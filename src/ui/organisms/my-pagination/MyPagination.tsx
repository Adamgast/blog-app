import { Pagination } from 'antd';
import cl from './MyPagination.module.scss';

interface MyPaginationProps {
  page: number;
  setPage: (arg: number) => void;
  articlesCount: number;
  size: 'small' | 'default' | undefined;
}

export const MyPagination = ({ page, setPage, articlesCount, size }: MyPaginationProps) => {
  return (
    <div className={cl.pagination}>
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={5}
        showSizeChanger={false}
        total={articlesCount}
        size={size}
      />
    </div>
  );
};
