import { Component, signal } from '@angular/core';
import { Card } from '../card/card';
import { Clothe } from '../Data/Clothe';
import { Clotheservice } from '../Data/clotheservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [Card],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  data: Clothe[] = [];
  clothes: Clothe[] = [];
  copyData = signal<Clothe[]>([]);
  stopLoad = signal<boolean>(false);
  welcome: string = '';
  activePage: string = '';
  categoryMap: { [key: string]: string } = {
  "t-shirt": "t-shirt",
  "tshirt": "t-shirt",
  "fit t-shirt": "t-shirt",
  "shirt": "shirt",
  "shirts": "shirt",
  "loose shirt": "shirt",
  "hat": "hat",
  "hats": "hat",
  "caps": "cap",
  "cap": "cap",
  "flutty hat": "hat",
  "cap with": "cap",
  "jeans": "jeans",
  "denim jean": "jeans",
  "denim jeans": "jeans",
  "fit jeans": "jeans",
  "cropped jeans": "jeans",
  "skirt": "skirt",
  "skirts": "skirt",
  "mini skirts": "skirt",
  "midi skirts": "skirt",
  "oversize": "oversize",
  "Oversize": "oversize",
  "loose": "oversize",
  "loose fit": "oversize",
  "Regular": "regular",
  "regular": "regular",
  "sports": "sport",
  "sport": "sport",
  "basket ball": "sport",
  "boxing": "sport",
  "backpack": "bag",
  "backpacks": "bag",
  "bags": "bag",
  "baggy": "bag",
  "shoulder": "bag",
  "sports backpack": "bag",
  "polo": "polo",
  "polo ": "polo",
  "trouser": "trouser",
  "trouser ": "trouser",
  "sneakers": "shoes",
  "skate sneakers": "shoes",
  "running sneakers": "shoes",
  "sandals": "shoes",
  "heels": "shoes",
  "shoes": "shoes",
  "unknown": "other"
};

  constructor(private service: Clotheservice,private route: ActivatedRoute){
  }
  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const code = params.get('filter');
    this.clothes = [];
    this.data = this.service.GetClothes();

    if (code == 'male' || code == 'female') {
      this.filterByGender(code);
    } else if (code == 'Zando' || code == 'Routine' || code == 'Ten eleven') {
      this.filterByBrand(code);
    } else if (code) {
      this.filterByCategory(code);
    }

    let categories: string[] = [];
    this.data.forEach(cl => {
      const unified = this.categoryMap[cl.category.trim()] || cl.category.trim().toLowerCase();
      if (!categories.includes(unified)) categories.push(unified);
    });
  });
}

  LoadMore(data: any) {
    const start = this.clothes.length;
    let end = this.clothes.length + 15;
    if((data.length - end) <= 0){
      for(let i = start; i < data.length; i++){
        this.clothes.push(data[i]);
      }
      this.stopLoad.set(true);
    } else{
      for(let i = start; i < end; i++){
        this.clothes.push(data[i]);
      }
    }
  }
  filterByGender(gender: string){
    this.data = (this.service.GetClothes()).filter(clothe => clothe.gender === gender);
    if(gender == 'male') {
      this.welcome = 'Gentlemen';
      this.activePage = 'Men';
    } else if(gender == 'female') {
      this.welcome = 'Ladies';
      this.activePage = 'Women';
    }
    this.copyData.set(this.data);
    this.LoadMore(this.data);
  }
  filterByCategory(category: string) {
  const filtered = this.data.filter(cl => {
    const unified = this.categoryMap[cl.category.trim()] || cl.category.trim().toLowerCase();
    return unified === category;
  });
  this.LoadMore(filtered);
  this.copyData.set(filtered);
  this.activePage = category.charAt(0).toUpperCase() + category.slice(1);
  this.welcome = '';
}
  filterByBrand(brand: string) {
    this.data = (this.service.GetClothes()).filter(clothe => clothe.brand === brand);
    this.copyData.set(this.data);
    this.LoadMore(this.data);
    this.activePage = brand;
    this.welcome = '';
  }
}
