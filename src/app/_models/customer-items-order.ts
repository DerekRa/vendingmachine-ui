import { Item } from './item';
export interface CustomerItemsOrder{
  id: number;
  money: number;
  generateCode: string;
  status: string;
  dateAdded: Date;
  dateUpdated: Date;
  orders: [{
    id: number;
    name: String;
    amount: number;
    price: String;
    dateAdded: Date;
  }]
}
