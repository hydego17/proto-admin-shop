import { useState } from 'react';

import { formatPrice } from '@/utils';
import { useGetCarts } from '@/services/carts';
import { useGlobalStore } from '@/store';
import Pagination from '@/components/pagination';
import { useCreateTable } from '@/components/table';

const PER_PAGE = 10;

/**
 * App carts page.
 *
 * @access public
 * @route /carts
 */
export default function CartPage() {
  const { updateStore } = useGlobalStore();

  // set params for carts query
  const [params, setParams] = useState({
    page: 1,
    perPage: PER_PAGE,
  });

  // Get all cart list
  const { data, status } = useGetCarts(params, {
    onSuccess: (data) => {
      // store total carts to global store
      let total = data.total;
      updateStore('totalCarts', total);
    },
  });

  const isEmpty = !data?.carts.length;
  const totalCarts = data?.total ?? 0;

  // Pagination handler
  const handleChangePage = (page) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const [Table, TableItem] = useCreateTable({
    data: data?.carts,
    status,
  });

  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold'>Carts ({totalCarts})</h1>
      </div>

      <hr />

      <Table>
        <TableItem label='User ID' dataKey='id' />
        <TableItem label='Total Product' dataKey='totalProducts' />
        <TableItem label='Quantity' dataKey='totalQuantity' />
        <TableItem label='Price' dataKey='total' format={formatPrice} />
        <TableItem label='Discounted Total' dataKey='discountedTotal' format={formatPrice} />
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
