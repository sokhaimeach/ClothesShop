import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clothe } from '../Data/Clothe';
import { Clotheservice } from '../Data/clotheservice';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  stars: number[] = [1, 2, 3, 4, 5];
  categories: any[] = [];
  genderList: Clothe[] = [];
  categoryList: string[] = ['skirt', 'shoes', 'shirt', 'oversize', 'regular', 'hat'];
  categoriesId: number[] = [518, 565, 21, 26, 247, 555];
  brandList: any[] = [];
  constructor(private service: Clotheservice) {}
  ngOnInit(): void {
    this.filterByCategory();
    this.filterForGender();
    this.service.GetClothes().map(item => {
      if(!this.brandList.includes(item.brand)) {
        this.brandList.push(item.brand);
      }
    });
    console.log(this.brandList);
    
  }
  filterByCategory(): void {
    let list: any[] = [];
    for (let i = 0; i < this.categoriesId.length; i++) {
      list.push((this.service.GetClothes()).find(c => (c.id === this.categoriesId[i])));
    }
    for(let i = 0; i < list.length; i++) {
      this.categories.push({...list[i], categoryName: this.categoryList[i]});
    }
  }

  filterForGender(){
    this.genderList = (this.service.GetClothes()).filter(c => (c.id === 39 || c.id === 504));
  }


}
