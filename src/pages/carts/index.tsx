import { useState } from 'react';
import { useRouter } from 'next/router';

import { formatPrice } from '@/utils';
import { useGetCarts } from '@/services/carts';
import { useGlobalStore } from '@/store';
import { useCreateTable } from '@/components/table';
import Pagination from '@/components/pagination';

const PER_PAGE = 10;

/**
 * App Carts Page.
 *
 * @access public
 * @route /carts
 */
export default function CartPage() {
  const router = useRouter();
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

  // Pagination handler
  const handleChangePage = (page) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const [Table, TableItem] = useCreateTable({
    data: data?.carts,
    status,
  });

  const handleDetailClick = (id) => {
    router.push(`/carts/${id}`);
  };

  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold'>Carts ({data?.total ?? 0})</h1>
      </div>

      <hr />

      <Table onDetailClick={handleDetailClick}>
        <TableItem label='User ID' dataKey='id' />
        <TableItem label='Total Product' dataKey='totalProducts' />
        <TableItem label='Quantity' dataKey='totalQuantity' />
        <TableItem label='Price' dataKey='total' format={formatPrice} />
        <TableItem label='Discounted Total' dataKey='discountedTotal' format={formatPrice} />
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
