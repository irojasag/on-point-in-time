import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { AddPurchaseComponent } from './pages/add-purchase/add-purchase.component';

const routes: Routes = [
  { path: '', component: PurchasesComponent },
  { path: 'add', component: AddPurchaseComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasesRoutingModule {}
