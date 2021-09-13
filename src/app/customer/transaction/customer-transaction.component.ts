import { Item } from './../../_models/item';
import { CustomerItemsOrder } from './../../_models/customer-items-order';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from './../../_service/customer.service';
import { Customer } from './../../_models/customer';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'customer-template',
  templateUrl: './customer-transaction.component.html'
})
export class CustomerTransaction implements OnInit{
  public customersAdmin: any[] | undefined;
  public custmr: Customer[] | undefined;
  constructor(private customerService: CustomerService){}
  ngOnInit(){
    this.getCustomers();
  }

  public getCustomers(): void{
    this.customerService.getCustomerInfo().subscribe(
      (response: Customer[]) => {
        this.custmr = response;

        let corders: any = [];
        for (let i = 0; i < this.custmr.length; i++) {
            const element = this.custmr[i];
            console.log("customer id ="+element.id);
            this.customerService.getCustomerOrderHistory(element.id).subscribe(
              (responseors: Item[]) => {
                console.log('orders = '+JSON.stringify(responseors));
                let corderlist = {
                  id: Number(element.id),
                  money: element.money,
                  generateCode: element.generateCode,
                  status: element.status,
                  dateAdded: element.dateAdded,
                  dateUpdated: element.dateUpdated,
                  orders: responseors
                }
                corders.push(corderlist);
                this.customersAdmin = corders;
                console.log("customer order data = "+corders);
                console.log("customer admin data now = "+JSON.parse(corders));
              },
              (error: HttpErrorResponse) => {
                alert(error.message);
              }
            );
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteCustomerModal(customer: Customer){
    document.getElementById('dataCustoToDelete')!.innerHTML = "<span id='custIdToDel' class='d-none'>"+ customer.id +"</span>";
  }

  public deleteCustomerNow(){
    document.getElementById('delete-cust-form')!.click();
    this.customerService.deleteCustomer(Number(document.getElementById('custIdToDel')!.textContent)).subscribe(
      (response:void) =>{
        console.log(response);
        this.getCustomers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
