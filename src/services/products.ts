import { useQuery } from '@tanstack/react-query';

import { http } from '@/lib/http';
import { queryKeys } from '@/constants/query-keys';
import type { ProductResponse } from '@/types/product';

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
        limit: perPage,
        skip: perPage * (page - 1),
      },
    })
    .then((res) => res.data);
}

export const useGetProducts = (params: ProductParams) => {
  return useQuery([queryKeys.products, params], () => getProducts(params));
};
