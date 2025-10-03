import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cartItemsSource = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() {
    // only run in browser
    if (typeof window !== 'undefined') {
      const carts = this.getCartFromStorage();
      this.cartItemsSource.next(carts);
    }
  }

  private getCartFromStorage(): any[] {
    if (typeof window === 'undefined') return []; // ✅ prevent SSR crash
    const cartItems = sessionStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  private saveCart(carts: any[]) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cartItems', JSON.stringify(carts));
    }
    this.cartItemsSource.next(carts);
  }

  addToCart(car: any, size: string, action: 'size' | 'plus' | 'minus') {
    let carts = this.getCartFromStorage();
    const existingItem = carts.find((item: any) => item.id === car.id);

    if (existingItem) {
      if (action === 'size') {
        existingItem.size = size;
      } else if (action === 'minus') {
        existingItem.quantity = Math.max(1, existingItem.quantity - 1);
      } else if (action === 'plus') {
        existingItem.quantity++;
      }
      existingItem.size = size;
      existingItem.price = existingItem.quantity * existingItem.unitPrice;
    } else {
      carts.push({
        ...car,
        unitPrice: car.price,
        quantity: 1,
        size,
        price: car.price
      });
    }

    this.saveCart(carts);
  }

  AddToCartDetail(item: any) {
    let carts = this.getCartFromStorage();
    const existingItem = carts.find((i: any) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity = item.quantity;
      existingItem.size = item.size;
      existingItem.price = item.quantity * existingItem.unitPrice;
    } else {
      carts.push({
        ...item,
        unitPrice: item.price,
        price: item.quantity * item.price
      });
    }

    this.saveCart(carts);
  }

  removeFromCart(car: any) {
    let carts = this.getCartFromStorage();
    carts = carts.filter((item: any) => item.id !== car.id);
    this.saveCart(carts);
  }

  removeAll() {
    this.saveCart([]);
  }

  displayCartItems() {
    return this.getCartFromStorage();
  }

  totalAmount() {
    return this.getCartFromStorage().reduce((total, item) => total + item.price, 0);
  }
}
