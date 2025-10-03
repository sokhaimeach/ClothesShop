import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Favorite {
  addToFavorites(car: any, condition: string) {
    const favorites: any = (sessionStorage.getItem('favorite'));
    let fav: any[] = [];
    fav = favorites ? JSON.parse(favorites) : [];
    if (condition === 'add') {
      fav.push(car);
      sessionStorage.setItem('favorite', JSON.stringify(fav));
    } else {
      if (favorites) {
        const updatedFavorites = fav.filter((fa: any) => fa.id !== car.id);
        sessionStorage.setItem('favorite', JSON.stringify(updatedFavorites));
      }
    }
  }

  isFavorite(car: any) {
    let found = false;

    const favorites = typeof window !== 'undefined' ? sessionStorage.getItem('favorite') : null;
    if (favorites) {
      const fav = JSON.parse(favorites);
      found = fav.find((fa: any) => fa.id === car.id) ? true : false;
    }
    return found;
  }

  displayFavorites() {
    let favCars = [];
    const favorites = typeof window !== 'undefined' ? sessionStorage.getItem('favorite') : null;
    if (favorites) {
      favCars = JSON.parse(favorites);
    }
    return favCars;
  }
}
