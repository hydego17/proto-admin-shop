import { useQuery } from '@tanstack/react-query';

import { http } from '@/lib/http';
import { queryKeys } from '@/constants/query-keys';
import type { ProductResponse } from '@/types/product';

type ProductParams = {
  search?: string;
  page: number;
  perPage: number;
};

export const useGetProducts = (params: ProductParams) => {
  return useQuery([queryKeys.products, params], () => {
    let { search, page, perPage } = params;
    return http
      .get<ProductResponse>(!!search ? `/products/search` : `/products`, {
        params: {
          q: search,
          limit: perPage,
          skip: perPage * (page - 1),
        },
      })
      .then((res) => res.data);
  });
};

export const useGetProductCategories = () => {
  return useQuery([queryKeys.productCategories], () => {
    return http.get<string[]>('/products/categories').then((res) => res.data);
  });
};
