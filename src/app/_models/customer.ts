export interface Customer{
  id: number;
  money: number;
  generateCode: string;
  status: string;
  dateAdded: Date;
  dateUpdated: Date;
  orders: [{
    id: number;
    productId: number;
    itemId: number;
    customer_id: number;
  }]
}
