import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Clothe } from '../Data/Clothe';
import { Clotheservice } from '../Data/clotheservice';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';
import { Cart } from '../Service/cart';
import { Favorite } from '../Service/favorite';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail {
  private activeRoute = inject(ActivatedRoute);
  private service = inject(Clotheservice);
  public cart = inject(Cart);
  public fav = inject(Favorite);

  detail!: Clothe | any;
  relateProdcut: Clothe[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  mainImage: string = '';
  
  cartItem: any;
  size: string = '';
  quantity: number = 1;

  slide = signal(0);

  ngOnInit(): void {
  this.activeRoute.paramMap.subscribe(params => {
    const id = Number(params.get('id'));
    this.detail = (this.service.GetClothes()).find(clothe => clothe.id == id);
    this.mainImage = this.detail.imageUrl[0];

    // Subscribe to cart updates
    this.cart.cartItems$.subscribe(items => {
      this.cartItem = items.find((i: any) => i.id == id) || { ...this.detail, size: '', quantity: 1 };
      this.size = this.cartItem.size;
      this.quantity = this.cartItem.quantity;
    });

    this.Related();
  });
}

  Related() {
    this.relateProdcut = (this.service.GetClothes())
      .filter(clothe => (clothe.category == this.detail.category && clothe.id != this.detail.id));
  }

  moveSlide(step: number) {
    const maxIndex = this.relateProdcut.length - 3;
    this.currentIndex += step;
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;
  }

  currentIndex = 0;

  AddToCart() {
  const item = { ...this.cartItem, size: this.size, quantity: this.quantity };
  this.cart.AddToCartDetail(item); // 🔥 updates both pages
}

decreas() {
  this.quantity = Math.max(1, this.quantity - 1);
}

toggleFavorite(event: Event, car: any) {
    const heart = event.target as HTMLElement;
    if (heart.classList.contains('bi-heart')) {
      heart.classList.add('text-danger');
      heart.classList.remove('bi-heart');
      heart.classList.add('bi-heart-fill');
    } else {
      heart.classList.remove('text-danger');
      heart.classList.remove('bi-heart-fill');
      heart.classList.add('bi-heart');
    }
    this.fav.addToFavorites(car, heart.classList.contains('bi-heart-fill') ? 'add' : 'remove');
  }
}
