import { useQuery } from '@tanstack/react-query';

import { http } from '@/lib/http';
import { queryKeys } from '@/constants/query-keys';
import type { CartsResponse, Cart } from '@/types/cart';
import type { CustomQueryOptions } from '@/utils/types';

type CartParams = {
  page: number;
  perPage: number;
};

export const useGetCarts = (params: CartParams, options?: CustomQueryOptions<CartsResponse>) => {
  return useQuery(
    [queryKeys.carts, params],
    () => {
      let { page, perPage } = params;
      return http
        .get<CartsResponse>('/carts', {
          params: {
            limit: perPage,
            skip: perPage * (page - 1),
          },
        })
        .then((res) => res.data);
    },
    options
  );
};

export const useGetCartDetail = (id: string) => {
  return useQuery(
    [queryKeys.cartDetail, id],
    () => {
      return http.get<Cart>(`/carts/${id}`).then((res) => res.data);
    },
    {
      enabled: !!id,
    }
  );
};
