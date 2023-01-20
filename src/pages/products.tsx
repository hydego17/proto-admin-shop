import { useState } from 'react';
import { TbSearch } from 'react-icons/tb';
import debounce from 'lodash.debounce';

import { formatPrice } from '@/utils';
import { useGetProducts } from '@/services/products';
import { useCreateTable } from '@/components/table';
import Input from '@/components/input';
import Pagination from '@/components/pagination';

const PER_PAGE = 10;

/**
 * App products page.
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
  const isEmpty = !data?.products.length;

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
        <TableItem dataKey='title' label='Product Name' width='30%' />
        <TableItem dataKey='brand' label='Brand' width='20%' />
        <TableItem dataKey='price' label='Price' width='20%' format={formatPrice} />
        <TableItem dataKey='stock' label='Stock' width='10%' />
        <TableItem dataKey='category' label='Category' width='20%' />
      </Table>

      <hr />

      <div className='flex justify-center'>
        {status === 'success' && (
          <Pagination page={params.page} perPage={params.perPage} total={data.total} onChange={handleChangePage} />
        )}
      </div>
    </div>
  );
}
