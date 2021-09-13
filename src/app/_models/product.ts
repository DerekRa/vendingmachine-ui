import { Item } from './item';
export interface Product {
  id: number;
  categoryName: String;
  config: {
    id: number;
    rows: number;
    columns: number;
  },
  items: Item[]
}
