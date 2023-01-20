import { useQuery } from '@tanstack/react-query';

import { http } from '@/lib/http';
import { queryKeys } from '@/constants/query-keys';
import type { CartResponse } from '@/types/cart';
import type { CustomQueryOptions } from '@/utils/types';

type CartParams = {
  page: number;
  perPage: number;
};

function getCarts({ page, perPage }: CartParams) {
  return http
    .get<CartResponse>('/carts', {
      params: {
        limit: perPage,
        skip: perPage * (page - 1),
      },
    })
    .then((res) => res.data);
}

export const useGetCarts = (params: CartParams, options?: CustomQueryOptions<CartResponse>) => {
  return useQuery([queryKeys.carts, params], () => getCarts(params), options);
};
