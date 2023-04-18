export interface IOrder {
  value: IData[];
  products: IOrderProduct[];
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  quantum: number;
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

export interface ISupplier {
  code: string;
  // name: string;
  // ord: number;
  // tags: string[] | undefined;
  // phone_support: string | undefined;
  // phone_contract: string | undefined;
  // hasContractOnline: boolean;
  // hasPaymentChoice: boolean;
  // parent_code: string | null;
  // type: string | null;
  // description: string | null;
  // add_shops: boolean;
}

export interface IShop {
  code: string;
}

export interface IData {
  supplier_code: string;
  shop_code: string;
}
