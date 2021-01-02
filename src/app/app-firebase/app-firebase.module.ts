import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebase)],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
})
export class AppFirebaseModule {}
