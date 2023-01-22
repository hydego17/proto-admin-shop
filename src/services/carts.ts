import { useQuery } from '@tanstack/react-query';

import { http } from '@/lib/http';
import { queryKeys } from '@/constants/query-keys';
import type { CartsResponse, Cart } from '@/types/cart';
import type { CustomQueryOptions } from '@/utils/types';

type CartParams = {
  page: number;
  perPage: number;
};

// MARK - Network Request

function getCarts({ page, perPage }: CartParams) {
  return http
    .get<CartsResponse>('/carts', {
      params: {
        limit: perPage,
        skip: perPage * (page - 1),
      },
    })
    .then((res) => res.data);
}

function getCartDetail(id: string) {
  return http.get<Cart>(`/carts/${id}`).then((res) => res.data);
}

// MARK - Queries

export const useGetCarts = (params: CartParams, options?: CustomQueryOptions<CartsResponse>) => {
  return useQuery([queryKeys.carts, params], () => getCarts(params), options);
};

export const useGetCartDetail = (id: string) => {
  return useQuery([queryKeys.cartDetail, id], () => getCartDetail(id), {
    enabled: !!id,
  });
};
