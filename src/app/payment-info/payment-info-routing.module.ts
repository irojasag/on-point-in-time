import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentInfoComponent } from './pages/payment-info/payment-info.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentInfoComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentInfoRoutingModule {}
