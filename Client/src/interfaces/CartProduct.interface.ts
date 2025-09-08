import IProduct from './product.interface.ts';

export default interface ICartProduct extends IProduct {
  quantity: number;
}