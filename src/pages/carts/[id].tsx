import React from 'react';
import { useRouter } from 'next/router';
import { ActionIcon, Loader } from '@mantine/core';
import { TbChevronLeft } from 'react-icons/tb';

import { useGetCartDetail } from '@/services/carts';
import { formatPrice } from '@/utils';

const ItemList = ({ label, children }) => (
  <div className='flex gap-2'>
    <div>{label}:</div>
    <div className='font-medium'>{children}</div>
  </div>
);

const CartDetailPage = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  // Get cart detail data from API
  const { data, isLoading } = useGetCartDetail(id);

  if (isLoading) {
    return (
      <div className='animate-show bg-white w-full h-full min-h-[60vh] centered'>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold flex items-center gap-4'>
          <ActionIcon color='violet' variant='default' onClick={() => router.back()}>
            <TbChevronLeft />
          </ActionIcon>

          <span>Cart Detail</span>
        </h1>
        <h1 className='text-xl font-semibold'>Order ID: {data?.id}</h1>
      </div>
      <hr />

      <div className='bg-slate-100 border-2 border-slate-300 rounded p-4 lg:p-8 '>
        <div>
          <div className='space-y-1'>
            <ItemList label='User ID'>{data?.userId}</ItemList>
            <ItemList label='Product Ordered'>{data?.totalProducts}</ItemList>
            <ItemList label='Total Quantity'>{data?.totalQuantity}</ItemList>
          </div>

          <hr />

          <div>
            <h3 className='font-medium'>Order Detail:</h3>

            <div className='mt-2 grid gap-4 grid-cols-1 lg:grid-cols-2'>
              {data?.products.map((p) => (
                <div key={p.id} className='bg-white p-4 rounded shadow flex justify-between'>
                  <div>
                    <div className='font-bold'>{p.title}</div>
                    <div className='text-sm text-slate-600'>{formatPrice(p.discountedPrice)}</div>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <div className='text-right font-semibold'>{p.quantity}</div>
                    <div className='text-sm text-medium text-slate-600'>Total {formatPrice(p.total)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <div className='flex flex-col lg:items-end'>
            <div className='lg:w-[250px] flex justify-between'>
              <span className='mr-4'>Sub Total: </span>
              <span className='font-semibold'>{formatPrice(data?.total)}</span>
            </div>

            <div className='mt-2 lg:w-[250px] flex justify-between'>
              <span className='mr-4'>Discount: </span>
              <span className='font-semibold'>-{formatPrice(Number(data?.total! - data?.discountedTotal!))}</span>
            </div>

            <div className='lg:w-[250px] flex justify-between mt-3'>
              <span className='mr-1'>Total:</span>
              <span className='font-bold text-xl'>{formatPrice(data?.discountedTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetailPage;
