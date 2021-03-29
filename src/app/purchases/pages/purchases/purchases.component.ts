import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Purchase } from 'src/app/models/purchase.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PurchaseBottomSheetComponent } from '../../components/purchase-bottom-sheet/purchase-bottom-sheet.component';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {
  public purchases$: Observable<Purchase[]>;
  public filteredPurchases: Purchase[];
  public purchases: Purchase[];
  public filterValue: FormControl;
  public subscriptions: Subscription;
  public isUserAdmin: boolean;

  constructor(
    public auth: AuthService,
    private bottomSheet: MatBottomSheet,
    private purchasesService: PurchaseService
  ) {
    this.isUserAdmin = false;
    this.filterValue = new FormControl();
    this.subscriptions = new Subscription();
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.isUserAdmin = user.isAdmin || user.isSuperAdmin;
        const needsWhere = !this.isUserAdmin;
        this.purchases$ = this.purchasesService.getAllPurchases(
          needsWhere ? user.uid : null
        );
        this.subscriptions.add(this.handlePurchasesSubscription());
      }
    });
  }

  ngOnInit(): void {}

  private handlePurchasesSubscription(): Subscription {
    return this.purchases$.subscribe(purchases => {
      this.purchases = purchases;
      this.restoreFilteredPurchases();
    });
  }

  private restoreFilteredPurchases() {
    this.filteredPurchases = this.purchases;
  }

  public filterPurchase(): void {
    if(this.filterValue.value === "") {
      this.restoreFilteredPurchases();
    } 
    else {
      this.filteredPurchases = this.purchases.filter(item => item.client.displayName.toLowerCase().includes(this.filterValue.value.toLowerCase()));
    }
  }

  public openBottomSheet(purchase: Purchase): void {
    this.bottomSheet.open(PurchaseBottomSheetComponent, {
      data: purchase,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
