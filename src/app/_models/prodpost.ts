export interface ProdPost {
  categoryName: String;
  config: {
    rows: number;
    columns: number;
  },
  items: [{
    name: String;
    amount: number;
    price: String;
  }]
}
