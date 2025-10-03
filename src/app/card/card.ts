import { Component, Input } from '@angular/core';
import { Clothe } from '../Data/Clothe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Favorite } from '../Service/favorite';
import { Cart } from '../Service/cart';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() Items: Clothe[] = [];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(public fav: Favorite, public cart: Cart) {}

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
