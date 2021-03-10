import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/models/purchase.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PurchaseBottomSheetComponent } from '../../components/purchase-bottom-sheet/purchase-bottom-sheet.component';
import { UserService } from 'src/app/services/user/user.service';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {
  public purchases$: Observable<Purchase[]>;
  public isUserAdmin: boolean;
  constructor(
    public auth: AuthService,
    private bottomSheet: MatBottomSheet,
    private userService: UserService,
    private purchasesService: PurchaseService
  ) {
    this.isUserAdmin = false;
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.isUserAdmin = user.isAdmin || user.isSuperAdmin;
        const needsWhere = !this.isUserAdmin;
        this.purchases$ = this.purchasesService.getAllPurchases(
          needsWhere ? user.uid : null
        );
      }
    });
  }

  public openBottomSheet(purchase: Purchase): void {
    this.bottomSheet.open(PurchaseBottomSheetComponent, {
      data: purchase,
    });
  }

  ngOnInit(): void {}
}
