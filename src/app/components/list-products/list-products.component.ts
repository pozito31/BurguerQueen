import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public listProducts: Product[];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.listProducts = [];
  }

  ngOnInit() {
    this.listProducts = this.productService.productsSelected;

    if (!this.listProducts) {
      this.router.navigate(['/list-categories']);
    }
  }

  selectProduct(product) {
    this.productService.productSelected = product;
  }

}
