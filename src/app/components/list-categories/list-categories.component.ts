import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  public listCategories: any[];

  constructor(
    private productService: ProductService
  ) {
    this.listCategories = [];
  }

  ngOnInit() {
    this.listCategories = this.productService.categories;
  }

  selectCategory(category) {
    this.productService.productsSelected = category.products;
  }

}
