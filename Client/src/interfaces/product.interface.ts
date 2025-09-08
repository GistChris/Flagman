export default interface Product {
  sku: number;
  name: string;
  manufacturer: string | null;
  regularPrice: number;
  salePrice: number;
  shippingCost: number | string;
  longDescription: string | null;
  customerReviewAverage: number | null;
  customerReviewCount: number | null;
  url: string;
  image: string | null;
  category: string;
  options?: any[];
  expirationDate? : string;
  salePercentage? : number;
}
