import { Category } from "./Category";


export interface Product {
  id: string;
  categories: Category[];
  name: string;
  qty: number;
  price: number;
  photo: string;
}