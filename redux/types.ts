export interface IOrder {
  supplier: string;
  shop: string;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  quantum: number | undefined;
  step: number | undefined;
  code: string;
  category: string;
  category_sub: string | undefined;
  name: string;
  ord: number | undefined;
  description: string | undefined;
  description_short: string | undefined;
  price: number;
  images: [string];
  balance: number | null;
  ei: string | null;
}

export interface IQuantity {
  count: number;
}
