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
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'purchases',
        loadChildren: () =>
          import('../purchases/purchases.module').then(
            (m) => m.PurchasesModule
          ),
      },
      {
        path: 'reservation-schedule',
        loadChildren: () =>
          import('../reservation-schedule/reservation-schedule.module').then(
            (m) => m.ReservationScheduleModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'payment-info',
        loadChildren: () =>
          import('../payment-info/payment-info.module').then(
            (m) => m.PaymentInfoModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'share',
        loadChildren: () =>
          import('../share/share.module').then((m) => m.ShareModule),
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
