import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { MatListModule } from '@angular/material/list';
import { UserUpdateBottomSheetComponent } from './pages/user-update-bottom-sheet/user-update-bottom-sheet.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent,
    UserUpdateBottomSheetComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UsersRoutingModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatBottomSheetModule,
  ]
})
export class UsersModule { }
