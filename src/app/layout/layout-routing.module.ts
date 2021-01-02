import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AdminGuard } from '../../app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../calendar/calendar.module').then((m) => m.CalendarModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import(
            '../bussiness-contact-info/bussiness-contact-info.module'
          ).then((m) => m.BussinessContactInfoModule),
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('../productos/productos.module').then(
            (m) => m.ProductosModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
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
export class LayoutRoutingModule {}
