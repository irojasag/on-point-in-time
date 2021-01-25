import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationScheduleComponent } from './pages/reservation-schedule/reservation-schedule.component';
import { ReservationScheduleFormComponent } from './pages/reservation-schedule-form/reservation-schedule-form.component';

const routes: Routes = [
  { path: '', component: ReservationScheduleComponent },
  { path: 'add', component: ReservationScheduleFormComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationScheduleRoutingModule {}
