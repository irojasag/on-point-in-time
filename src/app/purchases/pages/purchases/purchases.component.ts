import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {
  public purchases$: Observable<any[]>;
  constructor(public auth: AuthService, private afs: AngularFirestore) {
    this.purchases$ = this.afs
      .collection('purchases')
      .valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {}
}
