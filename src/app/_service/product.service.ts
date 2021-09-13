import { Item } from './../_models/item';
import { Product } from '../_models/product';
import { ProdPost } from '../_models/prodpost';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {

  private apiServerUrl = environment.apiBaseUrlProduct;

  constructor(private http: HttpClient) { }

  public getProductItemList(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiServerUrl}/api/all`);
  }

  public updateItemDetails(item: Item): Observable<Item>{
    return this.http.put<Item>(`${this.apiServerUrl}/api/update/item`, item);
  }

  public addProductItem(product: ProdPost): Observable<ProdPost>{
    return this.http.post<ProdPost>(`${this.apiServerUrl}/api/add`,product);
  }

  public deleteProductItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/forceDeleteItem/${itemId}`);
  }

  public deleteProduct(prodId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/forceDelete/${prodId}`);
  }
}
