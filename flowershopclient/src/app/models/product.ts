export interface product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  brand: string;
  quantityInStock?: number;
}
