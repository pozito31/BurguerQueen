import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: 'list-categories', component: ListCategoriesComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'product', component: ProductComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'list-categories' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
