import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    EntryRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EntryModule {}
