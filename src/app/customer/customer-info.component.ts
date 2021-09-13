import { Item } from './../_models/item';
import { CustomerService } from './../_service/customer.service';
import { Customer } from './../_models/customer';
import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector : 'customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfo implements OnInit {
  public customers: Customer[] | undefined;
  public customerOrderHistory: Item[] | undefined;
  @Input() public newcustomer: Customer | undefined;
  admin = false;
  show: boolean = true;

  constructor(private customerService: CustomerService){ }

  ngOnInit(){  }

  public onGetAdmin(ngForm: NgForm){
    if((ngForm.value.username === "secret") && (ngForm.value.password === "secret")){
      this.admin = true;
      this.show = false;
      document.getElementById('registerNow')!.style.visibility="hidden";
      document.getElementById('loginNow')!.style.visibility="hidden";
      document.getElementById('adminLogin')!.style.visibility="hidden";
      document.getElementById('login-admin-form')!.click();
    } else {
      document.getElementById('errorLoginAdmin')!.innerText = "Wrong username and password!";
    }
  }

  public onAddCustomer(addForm: NgForm): void{
    if(addForm.value.money!==null){
      document.getElementById('registerNow')!.style.visibility="hidden";
      document.getElementById('loginNow')!.style.visibility="hidden";
      document.getElementById('adminLogin')!.style.visibility="hidden";
      document.getElementById('errorReg')!.remove();
      document.getElementById('regForm')!.remove();
      this.customerService.addCustomer(addForm.value).subscribe(
        (response: Customer) => {
          console.log(response);
          this.newcustomer = response;
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    } else {
      document.getElementById('errorReg')!.innerText = "Please Enter Valid Money!";
    }
  }

  public onGetCustomer(loginForm: NgForm): void{
    this.customerService.getCustomerInfoByGCode(loginForm.value.generateCode).subscribe(
      (response: Customer) => {
        console.log(response);
        document.getElementById('registerNow')!.style.visibility="hidden";
        document.getElementById('loginNow')!.style.visibility="hidden";
        document.getElementById('adminLogin')!.style.visibility="hidden";
        document.getElementById('login-customer-form')!.click();
        this.newcustomer = response;
      },
      (error: HttpErrorResponse) => {
        document.getElementById('errorLogin')!.innerText = "Wrong CODE!";
      }
    )
  }

  public onUpdateCustomer(addMoneyForm: NgForm){
    if(!isNaN(Number(addMoneyForm.value.money))){
      document.getElementById('balanceId')!.style.color = 'black';
      console.log('current money = '+this.newcustomer!.money);
      console.log('balance   =   '+document.getElementById('balanceId')!.innerText);
      console.log('money to add = '+addMoneyForm.value.money);
      this.newcustomer!.money = this.newcustomer!.money + Number(addMoneyForm.value.money);
      this.customerService.updateMoneyCustomer(this.newcustomer!).subscribe(
        (response: Customer) => {
          console.log(response);
          this.newcustomer = response;
          addMoneyForm.reset();
          document.getElementById('balanceId')!.innerText = this.newcustomer.money + "";
          document.getElementById('currentBalId')!.innerText = document.getElementById('balanceId')!.innerText;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    } else{
      alert('Not a Number');
    }
  }

  public getCustomerOrders(customerId: number){
    this.customerService.getCustomerOrderHistory(customerId).subscribe(
      (response: Item[]) => {
        this.customerOrderHistory = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public updateBalModal(){
    document.getElementById('currentBalId')!.innerText = document.getElementById('balanceId')!.innerText;
  }

  public reloadPage(){
    location.reload();
  }
}
