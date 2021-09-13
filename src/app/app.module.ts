import { CustomerTransaction } from './customer/transaction/customer-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './_service/customer.service';
import { AdminTemplate } from './admin/admin-template.component';
import { CustomerInfo } from './customer/customer-info.component';
import { ProductService } from './_service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemListComponent } from './items/item-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    CustomerInfo,
    AdminTemplate,
    CustomerTransaction
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
