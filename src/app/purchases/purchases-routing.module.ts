import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchasesComponent } from './pages/purchases/purchases.component';

const routes: Routes = [
  { path: '', component: PurchasesComponent },
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
