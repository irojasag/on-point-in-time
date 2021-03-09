import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductToPurchaseFormComponent } from '../../components/add-product-to-purchase-form/add-product-to-purchase-form.component';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/models/purchase.model';
import { UserService } from '../../../services/user/user.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss'],
})
export class AddPurchaseComponent implements OnInit, OnDestroy {
  public today = new Date();
  public paymentMethods$: Observable<PaymentMethod[]>;

  public users: User[];
  public selectedClient: User;
  public users$: Observable<User[]>;
  public filteredUsers$: Observable<User[]>;

  public productsToBuy: Product[];

  public totalToPay: number;

  public form: FormGroup;
  public editMode: boolean;
  private purchaseId: string;
  public subscriptions: Subscription;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private roter: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UserService,
    private purchasesService: PurchaseService
  ) {
    this.subscriptions = new Subscription();
    this.productsToBuy = [];
    this.totalToPay = 0;
    this.form = this.formBuilder.group({
      billNumber: [0],
      clientId: [null, Validators.required],
      purchasedAt: [new Date(), Validators.compose([Validators.required])],
      paymentMethod: [null, Validators.required],
    });
    this.form.controls.purchasedAt.disable();

    this.paymentMethods$ = this.afs
      .collection<PaymentMethod>('payment-methods')
      .valueChanges({ idField: 'id' });

    this.users$ = this.usersService.users$;

    this.subscriptions.add(this.handleUsersSubscription());

    this.filteredUsers$ = this.form.controls.clientId.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterUsers(state) : (this.users || []).slice()
      )
    );

    this.subscriptions.add(this.handlePurchasesSubscription());
  }

  private _filterUsers(value: string): User[] {
    const filterValue = (value || '').toLowerCase();

    return (this.users || []).filter(
      (user) => user.displayName.toLowerCase().indexOf(filterValue) !== -1
    );
  }

  public selectClient(user): void {
    this.selectedClient = user;
  }

  public openProductPurchaseAddDialog(): void {
    const formDialog = this.dialog.open(AddProductToPurchaseFormComponent, {
      height: '424px',
      width: '300px',
    });
    formDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.productsToBuy.push(result);
        this.updateTotalToPay();
      }
    });
  }

  public removeItem(index: number): void {
    this.productsToBuy = this.productsToBuy.filter((_, idx) => {
      return idx !== index;
    });
    this.updateTotalToPay();
  }

  public updateTotalToPay(): void {
    this.totalToPay = this.productsToBuy.reduce(
      (accumlated, current) => accumlated + current.price,
      0
    );
  }

  public savePurchaseForm(): void {
    const body = {
      ...this.form.getRawValue(),
      products: this.productsToBuy,
      total: this.totalToPay,
      clientId: this.selectedClient.uid,
    };

    if (this.editMode) {
      this.afs
        .doc(`purchases/${this.purchaseId}`)
        .update(body)
        .then(() => {
          this.snackBar.open(
            `Se ha actualizado la factura #${this.form.controls.billNumber.value}`,
            '',
            {
              duration: 2000,
            }
          );
          this.roter.navigate(['../../'], { relativeTo: this.activatedRoute });
        })
        .catch((err) => {
          console.log('error', err);
        });
    } else {
      this.afs
        .collection('purchases')
        .add(body)
        .then(() => {
          this.snackBar.open(`Se ha sido añadido una factura nueva`, '', {
            duration: 2000,
          });
          this.roter.navigate(['../'], { relativeTo: this.activatedRoute });
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.activatedRoute.data.subscribe((data) => {
        if (data && data.editMode) {
          const purchaseId: Observable<string> = this.activatedRoute.params.pipe(
            map((p) => p.id)
          );
          this.subscriptions.add(
            this.handlePurchaseIdSubscription(purchaseId, data)
          );
        }
      });
    }, 300);
  }

  private handleUsersSubscription(): Subscription {
    return this.users$.subscribe((users) => (this.users = users));
  }

  private handleLoadPurchaseToEdit(id: string): Subscription {
    return this.afs
      .doc<Purchase>(`purchases/${id}`)
      .valueChanges({ idField: 'id' })
      .subscribe((purchase) => {
        const user = this.users.find((us) => us.uid === purchase.clientId);
        this.selectClient(user);
        this.productsToBuy = purchase.products.map((product) => ({
          ...product,
          expirationDate: product.expirationDate.toDate() as any,
          startDate: (
            product.startDate || purchase.purchasedAt
          ).toDate() as any,
        }));
        this.form.patchValue({
          ...purchase,
          purchasedAt: purchase.purchasedAt.toDate(),
          clientId: user.displayName,
        });
        this.updateTotalToPay();
      });
  }

  private handlePurchasesSubscription(): Subscription {
    return this.purchasesService.purchases$.subscribe((purchases) => {
      let maxBill = 0;
      (purchases || []).forEach((purchase) => {
        if (purchase.billNumber > maxBill) {
          maxBill = purchase.billNumber;
        }
      });
      this.form.controls.billNumber.patchValue(maxBill + 1);
    });
  }

  private handlePurchaseIdSubscription(
    purchaseId: Observable<string>,
    data
  ): Subscription {
    return purchaseId.subscribe((id) => {
      if (id) {
        this.purchaseId = id;
        this.editMode = data.editMode;
        this.subscriptions.add(this.handleLoadPurchaseToEdit(id));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
