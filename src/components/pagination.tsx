import React from 'react';
import { Pagination as MantinePagination, type PaginationProps } from '@mantine/core';

type Props = PaginationProps & {
  page: number;
  perPage: number;
  total: number;
};

const Pagination = ({ page, perPage, total, ...props }: Props) => {
  const totalPages = Math.ceil(total / perPage);

  return <MantinePagination size='sm' siblings={1} page={page} total={totalPages} {...props} />;
};

export default Pagination;
