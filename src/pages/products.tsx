import { useState } from 'react';
import { Pagination, Table, TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import debounce from 'lodash.debounce';

import { formatPrice } from '@/utils';
import { useGetProducts } from '@/services/products';

const PER_PAGE = 12;

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

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-4 justify-between'>
        <h1 className='text-2xl font-bold'>Products</h1>

        <div>
          <TextInput icon={<TbSearch />} placeholder='Search product' onChange={handleSearch} />
        </div>
      </div>

      <hr />

      <div className='table-container bg-white'>
        <Table striped withBorder highlightOnHover withColumnBorders horizontalSpacing='md'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' &&
              Array(PER_PAGE)
                .fill(0)
                .map((_, idx) => (
                  <tr key={idx} className='animate-show'>
                    <td className='animate-pulse' colSpan={5}>
                      <div className='bg-slate-200 h-6' />
                    </td>
                  </tr>
                ))}

            {status === 'success' && isEmpty ? (
              <tr className='animate-show'>
                <td colSpan={5}>
                  <div className='py-8 text-center text-slate-500'>No Product Found</div>
                </td>
              </tr>
            ) : (
              data?.products.map((p) => (
                <tr key={p.id} className='animate-show'>
                  <td>{p.title}</td>
                  <td>{p.brand}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td>{p.stock}</td>
                  <td>{p.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <hr />

      <div className='flex justify-center'>
        {data && (
          <Pagination size='sm' page={params.page} onChange={handleChangePage} total={data.total} siblings={1} />
        )}
      </div>
    </div>
  );
}
