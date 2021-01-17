import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './pages/purchases/purchases.component';


@NgModule({
  declarations: [PurchasesComponent],
  imports: [
    CommonModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
