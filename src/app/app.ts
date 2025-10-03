import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Favorite } from './Service/favorite';
import { CommonModule } from '@angular/common';
import { Cart } from './Service/cart';
import { Clotheservice } from './Data/clotheservice';
import { Clothe } from './Data/Clothe';
import { Card } from './card/card';
import { Telegramservice } from './Service/telegramservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ClotheShop';

  genderList = [
    { label: 'Men', filter: 'male' },
    { label: 'Women', filter: 'female' }
  ];

  categories: string[] = [
    "t-shirt", "shirt", "jeans", "hat", "skirt",
    "oversize", "regular", "sport", "bag", "polo",
    "trouser", "shoes", "other"
  ];

  // hidde menu
  hiddeShop = signal('0px');
  hiddeGender = signal('0px');
  hiddeCategory = signal('0px');
  hiddeBrand = signal('0px');

  cartItems: any[] = [];
  total: number = 0;
  searchList: Clothe[] = [];
  constructor(public fav: Favorite,
    public cart: Cart,
    private data: Clotheservice,
    private telegram: Telegramservice) { }

  ngOnInit(): void {
    this.cart.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cart.totalAmount();
    });
  }

  payway: number = 0;
  checkSize(item: any, size: string) {
    item.size = size;
  }

  message: string = '';
  alert = signal('');
  loading = signal('none');

  checkPay() {
    const sizes = (this.cart.displayCartItems()).find((ca: any) => ca.size == '') || {};
    if (this.payway == 0) {
      this.message = 'Please select method to pay';
    } else if (sizes.size == '') {
      this.message = 'Please choose any size';
    } else {
      this.Recipt(this.cart.displayCartItems());
      this.message = '';
      this.loading.set('flex');
      setTimeout(() => {
        this.loading.set('none')
        setTimeout(() => {
          this.alert.set('success');
          this.cart.removeAll();
          setTimeout(() => this.cart.displayCartItems(), 100);
          setTimeout(() => this.alert.set(''), 3000);
        }, 100);
      }, 2000);
    }
  }

  filterSearch(text: string) {
    if (!text) {
      this.searchList = [];
      return;
    }
    this.searchList = this.data.GetClothes().filter(pro => pro.name.toLowerCase().includes(text.toLowerCase()));
  }

  Recipt(item: any) {
    let total = 0;
    let message = '============== Order =============\n';
    for(let i = 0; i < item.length; i++){
      message += '\nName : ' + item[i].name + '\nSize : ' + item[i].size;
      message += '\nQuantity : ' + item[i].quantity;
      message += '\nPrice : $ ' + item[i].unitPrice;
      total += item[i].price;
      message += '\n-----------------------------------------------------------';
    }
    message += '\nTotal Price : $ ' + total;
    message += '\n=========================';

    this.telegram.sendRecipt(message).subscribe(res => console.log('recipt have sended!'));
  }
}
