import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { http } from '@/lib/http';
import type { ApiResponse } from '@/types/api';

type ProductResponse = ApiResponse<'products', Product[]>;

type ProductParams = {
  search?: string;
  page: number;
  perPage: number;
};

function getProducts({ search, page, perPage }: ProductParams) {
  return http
    .get<ProductResponse>(!!search ? `/products/search` : `/products`, {
      params: {
        q: search,
        skip: page - 1,
        limit: perPage,
      },
    })
    .then((res) => res.data);
}

export const useGetProducts = (params: ProductParams) => {
  return useQuery([queryKeys.products, params], () => getProducts(params));
};
