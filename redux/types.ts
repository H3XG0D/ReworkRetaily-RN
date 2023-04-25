export interface IOrder {
  supplier: string;
  shop: string;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  quantum: number;
  step: number;
  code: string;
  category: string;
  category_sub: string | undefined;
  name: string;
  ord: number | undefined;
  description: string | undefined;
  description_short: string | undefined;
  price: number;
  images: [string];
  balance: number;
  ei: string | null;
  properties1: IProductProperty1[];
  properties2: IProductProperty2[];
}

export interface ISupplier {
  code: string;
  name: string;
  ord: number;
  tags: string[] | undefined;
  phone_support: string | undefined;
  phone_contract: string | undefined;
  hasContractOnline: boolean;
  hasPaymentChoice: boolean;
  parent_code: string | null;
  type: string | null;
  description: string | null;
  add_shops: boolean;
}

export interface IShop {
  code: string;
  name: string;
}

export interface IData {
  supplier_code: string;
  shop_code: string;
}

export interface IProductProperty1 {
  code: string;
  name: string;
  value: string | null;
}

export interface IProductProperty2 {
  code: string;
  name: string;
  value: string | null;
}
