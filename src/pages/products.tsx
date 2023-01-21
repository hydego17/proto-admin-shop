import { useState } from 'react';
import { TbSearch } from 'react-icons/tb';
import debounce from 'lodash.debounce';

import { formatPrice } from '@/utils';
import { useGetProducts } from '@/services/products';
import { useCreateTable } from '@/components/table';
import Pagination from '@/components/pagination';
import Input from '@/components/input';

const PER_PAGE = 10;

/**
 * App Products Page.
 *
 * @access public
 * @route /products
 */
export default function ProductPage() {
  // set params for product query
  const [params, setParams] = useState({
    search: '',
    page: 1,
    perPage: PER_PAGE,
  });

  // Get filtered products
  const { data, status } = useGetProducts(params);

  // Handle user search input
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 500);

  // Pagination handler
  const handleChangePage = (page) => {
    setParams((prev) => ({ ...prev, page }));
  };

  // Create table components from data
  const [Table, TableItem] = useCreateTable({
    data: data?.products,
    status,
  });

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-4 justify-between'>
        <h1 className='text-2xl font-bold'>Products</h1>

        <div>
          <Input
            controlled
            icon={<TbSearch />}
            placeholder='Search product'
            onChange={handleSearch}
            className='min-w-[300px]'
          />
        </div>
      </div>

      <hr />

      <Table>
        <TableItem label='Product Name' dataKey='title' width='30%' />
        <TableItem label='Brand' dataKey='brand' width='20%' />
        <TableItem label='Price' dataKey='price' width='20%' format={formatPrice} />
        <TableItem label='Stock' dataKey='stock' width='10%' />
        <TableItem label='Category' dataKey='category' width='20%' />
      </Table>

      <hr />

      <div className='flex justify-center'>
        {data && (
          <Pagination page={params.page} perPage={params.perPage} total={data.total} onChange={handleChangePage} />
        )}
      </div>
    </div>
  );
}
