import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';
import { UsersChartComponent } from './components/users-chart/users-chart.component';
import { PurchasesChartComponent } from './components/purchases-chart/purchases-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    UsersChartComponent,
    PurchasesChartComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    ChartsModule,
  ],
})
export class LayoutModule {}
