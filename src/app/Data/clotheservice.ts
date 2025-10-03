import { Injectable } from '@angular/core';
import { CLOTHES_DATA } from './ClotheData';

@Injectable({
  providedIn: 'root'
})
export class Clotheservice {
  GetClothes() {
    return CLOTHES_DATA;
  }
}
