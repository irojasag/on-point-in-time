import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BussinessContactInfoComponent } from './pages/bussiness-contact-info/bussiness-contact-info.component';

const routes: Routes = [
  {
    path: '',
    component: BussinessContactInfoComponent,
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
export class BussinessContactInfoRoutingModule {}
