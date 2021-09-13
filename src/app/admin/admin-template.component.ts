import { Product } from './../_models/product';
import { ProdPost } from './../_models/prodpost';
import { Item } from './../_models/item';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../_service/product.service';
import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplate implements OnInit{
  public productsAdmin: Product[] | undefined;
  @Input() show: any;
  constructor(private productService: ProductService){}
  ngOnInit(){
    this.getProducts();
  }

  public getProducts(): void{
    this.productService.getProductItemList().subscribe(
      (response: Product[]) => {
        this.productsAdmin = response;
        console.log(this.productsAdmin);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onClickAddProductList(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let option = '<option value="" selected>Choose</option>';
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i].toLocaleUpperCase();
      option += '<option value="'+i+'">'+letter+'</option>'
    }
    document.getElementById('allLetters')!.innerHTML = option;
  }

  public addProductForm(addForm: NgForm): void{
    document.getElementById('messageOnAdd')!.style.visibility = "visible";
    document.getElementById('messageOnAdd')!.style.color = "red";
    if (addForm.value.letter === '' || addForm.value.name === '' || addForm.value.amount === '' || addForm.value.price == '') {
      document.getElementById('messageOnAdd')!.innerText = "Please Fill all items!";
    } else if(addForm.value.amount === null || addForm.value.price === null) {
      document.getElementById('messageOnAdd')!.innerText = "Please add numbers on amount or price field!";
    } else if(!!(Number(addForm.value.amount) % 1)){
      document.getElementById('messageOnAdd')!.innerText = "Please remove decimal on amount field!";
    } else {
      let catName = '';
      const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
      for (let i = 0; i < alphabet.length; i++) {
        if(i === Number(addForm.value.letter)){
          catName = alphabet[i].toLocaleUpperCase();
        }
      }
      const prod: ProdPost = {
        'categoryName' : catName+"",
        'config' : {
          'rows' : Number(addForm.value.letter),
          'columns' : 0
        },
        items : [{
          name: addForm.value.name,
          amount: Number(addForm.value.amount),
          price: "$"+addForm.value.price
        }]
      };
      this.productService.addProductItem(prod).subscribe(
        (response: ProdPost) => {
          console.log(response);
          document.getElementById('messageOnAdd')!.style.color = "green";
          document.getElementById('messageOnAdd')!.innerText = "Sucessfully Added!!";
          addForm.reset();
          this.getProducts();
        },
        (error: HttpErrorResponse) => {
          document.getElementById('messageOnAdd')!.innerText = "Letter "+catName+" is Full!!";
          addForm.reset();
        }
      );
    }
    setTimeout(function() {
      document.getElementById('messageOnAdd')!.style.visibility = "hidden";
    }, 4000);
  }

  public deleteModal(product: Product, item: Item){
    document.getElementById('dataToDelete')!.innerHTML = "Letter: <strong>"+product.categoryName+"</strong><br/>Name: <u>" +item.name +"</u>"+
              "<br/>Item/s: <strong>" +item.amount + "</strong><br/>Price: <em>" + item.price + "</em><br/>" +
              "<span id='itemIdToDel' class='d-none'>"+ item.id +"</span>";
  }

  public deleteItemNow(){
    document.getElementById('delete-item-form')!.click();
    this.productService.deleteProductItem(Number(document.getElementById('itemIdToDel')!.textContent)).subscribe(
      (response:void) =>{
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteProdModal(product: Product){
    document.getElementById('dataProdToDelete')!.innerHTML = "<span id='prodIdToDel' >"+ product.id +"</span>";//class='d-none'
  }

  public deleteProdNow(){
    document.getElementById('delete-prod-form')!.click();
    this.productService.deleteProduct(Number(document.getElementById('prodIdToDel')!.textContent)).subscribe(
      (response:void) =>{
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public updateModal(product: Product, item: Item){
    document.getElementById('nmIdupd')!.innerText = item.name+"";
    document.getElementById('amtIdupd')!.innerText = item.amount+"";
    document.getElementById('prcIdupd')!.innerText = item.price+"";
    document.getElementById('letterIdup')!.innerHTML = product.categoryName+"";
    document.getElementById('itemIdToupdate')!.innerText = item.id+"";
    document.getElementById('prdIdupd')!.innerText = product.id+"";
  }

  public udpateItemNow(updateData: NgForm){
    let name = updateData.value.nametoup+"" === 'null' || updateData.value.nametoup+"" === '' ? document.getElementById('nmIdupd')!.textContent+"" : updateData.value.nametoup;
    let amount = updateData.value.amounttoup+"" === 'null' || updateData.value.amounttoup+"" === '' ? document.getElementById('amtIdupd')!.textContent+"" : updateData.value.amounttoup;
    let price = updateData.value.pricetoup+"" === 'null' || updateData.value.pricetoup+"" == '' ? document.getElementById('prcIdupd')!.textContent+"" : '$'+updateData.value.pricetoup;
    let item = {
      id: Number(document.getElementById('itemIdToupdate')!.textContent),
      name: name,
      amount: Number(amount),
      price: price+"",
      product_id: Number(document.getElementById('prdIdupd')!.textContent),
      dateAdded: new Date()
    }
    this.productService.updateItemDetails(item).subscribe(
      (response: Item) => {
        console.log(response);
        updateData.reset();
        document.getElementById('update-item-form')!.click();
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

