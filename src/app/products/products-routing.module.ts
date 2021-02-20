import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormDialogComponent } from './pages/product-form-dialog/product-form-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'add',
    component: ProductFormDialogComponent,
  },
  {
    path: 'edit/:id',
    component: ProductFormDialogComponent,
    data: { editMode: true },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
