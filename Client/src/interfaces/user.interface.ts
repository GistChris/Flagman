import ICartProduct from "../interfaces/CartProduct.interface";
export interface UserInterface {
  _id: string;
  name: string;
  local: {
    password: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  addresses: string[];
  cards: number[];
  password: string;
  email: string;
  createdOrder: Date;
  longDescription: string|undefined;
  orders: [];
  shippingAddress: string | undefined;
  paymentInfo: string | undefined;
  TPS: number | undefined;
  TVQ: number | undefined;
  orderTotal: number | undefined;
}

export type UserFormInterface = Partial<UserInterface>;

export interface SigninFormInterface {
  password: string;
  email: string;
  address: string;
}

export interface UserAddressInterface {
  email: string | undefined;
  address: string | undefined;
  index: number;
}
export interface UserCardInterface {
  email: string | undefined;
  cardNumber: number | undefined;
  index: number;
}
export interface UserOrderInterface {
  email: string | undefined;
  longDescription: string | undefined;
  order: ICartProduct[] | undefined;
  shippingAddress: string | undefined;
  paymentInfo: number | undefined;
  TPS: string | undefined;
  TVQ: string | undefined;
  orderTotal: string | undefined;
  subTotal: string | undefined;
  createdOrder: Date | undefined|string;
  index: number|undefined;
}
