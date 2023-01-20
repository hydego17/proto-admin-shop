import type { ApiResponse } from './api';

interface CartProduct {
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  price: number;
  quantity: number;
  title: string;
  total: number;
}

export interface Cart {
  discountedTotal: number;
  id: number;
  products: CartProduct[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}

export type CartResponse = ApiResponse<'carts', Cart[]>;
