import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { http } from '@/lib/http';
import type { ApiResponse } from '@/types/api';

type ProductResponse = ApiResponse<'products', Product[]>;

function getProducts(params = {}) {
  return http
    .get<ProductResponse>('/products', {
      params,
    })
    .then((res) => res.data);
}

export const useGetProducts = (params = {}) => {
  return useQuery([queryKeys.products, params], () => getProducts(params));
};
