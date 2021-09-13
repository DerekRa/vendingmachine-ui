import { Orders } from './../_models/order';
import { Item } from './../_models/item';
import { CustomerOrderList } from './../_models/customer-order-list';
import { CustomerService } from './../_service/customer.service';
import { Customer } from './../_models/customer';
import { Component, Input, OnInit } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from "../_models/product";
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public products: Product[] | undefined;
  @Input() newcustomer: any;

  constructor(private productService: ProductService,
    private customerService: CustomerService){}

  ngOnInit(){
    this.getProducts();
  }

  public getProducts(): void{
    this.productService.getProductItemList().subscribe(
      (response: Product[]) => {
        this.products = response;

        console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public buyItemNow(item: Item, productId: number,customer: Customer){
    let orders = {
                productId : productId,
                itemId : item.id,
                customer_id : customer.id }
    let money = this.newcustomer.money
    let iprice = item.price.replace('$','');
    let price =  Number(iprice)
    document.getElementById('balanceId')!.style.color = 'black';
    if (Number(item.amount) > 0) {
      if (money >= price) {
        this.customerService.addCustomerOrder(orders).subscribe(
          (response: CustomerOrderList) => {
            item.amount = item.amount - 1;
            this.productService.updateItemDetails(item).subscribe(
              (responseitem: Item) => {
                this.newcustomer.money = this.newcustomer.money - Number(iprice);
                this.customerService.getCustomerOrder(this.newcustomer.id).subscribe(
                  (responseorder: Orders[]) => {
                      this.newcustomer.orders = responseorder;
                      this.customerService.updateMoneyCustomer(this.newcustomer).subscribe(
                        (response: Customer) => {
                          console.log(response);
                          this.newcustomer = response;
                          document.getElementById('balanceId')!.innerText = this.newcustomer.money;
                        },
                        (error: HttpErrorResponse) => {
                          alert("error in updating money ="+error.message);
                        }
                      )
                  },
                  (error: HttpErrorResponse) => {
                    alert("error in getting customer orders =" +error.message);
                  }
                )
              },
              (error: HttpErrorResponse) => {
                alert("error in updating item count = "+error.message);
              }
            )
          },
          (error: HttpErrorResponse) => {
            alert("error in updating customer order = "+error.message);
          }
        )
      } else {
        document.getElementById('balanceId')!.style.color = 'red';
      }
    } else {
      alert("Item "+item.name+" is now empty!")
    }
  }

}
