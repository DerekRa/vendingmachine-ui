import { Orders } from './../_models/order';
import { Item } from './../_models/item';
import { CustomerOrderList } from './../_models/customer-order-list';
import { Customer } from './../_models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({providedIn:"root"})
export class CustomerService{

  private apiServerUrl = environment.apiBaseUrlCustomer;

  constructor(private http: HttpClient) { }

  public getCustomerInfo(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.apiServerUrl}/api/all`);
  }

  public getCustomerInfoByGCode(generateCode: string): Observable<Customer>{
    return this.http.get<Customer>(`${this.apiServerUrl}/api/gcode/${generateCode}`);
  }

  public getCustomerOrderHistory(customerId: number): Observable<Item[]>{
    return this.http.get<Item[]>(`${this.apiServerUrl}/api/customerOrder/${customerId}`);
  }

  public getCustomerOrder(customerId: number): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.apiServerUrl}/api/customerOrderList/${customerId}`);
  }

  public addCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(`${this.apiServerUrl}/api/add`, customer);
  }

  public addCustomerOrder(order: CustomerOrderList): Observable<CustomerOrderList>{
    return this.http.post<CustomerOrderList>(`${this.apiServerUrl}/api/addOrder`, order);
  }

  public updateMoneyCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiServerUrl}/api/update`,customer);
  }

  public deleteCustomer(custId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/forceDelete/${custId}`);
  }
}
