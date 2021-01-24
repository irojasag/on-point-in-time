import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductToPurchaseFormComponent } from '../../components/add-product-to-purchase-form/add-product-to-purchase-form.component';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss'],
})
export class AddPurchaseComponent implements OnInit {
  public today = new Date();
  public paymentMethods$: Observable<PaymentMethod[]>;

  public users: User[];
  public selectedClient: User;
  public users$: Observable<User[]>;
  public filteredUsers$: Observable<User[]>;

  public productsToBuy: Product[];

  public totalToPay: number;

  public form: FormGroup;
  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private roter: Router,
    private activatedRoute: ActivatedRoute
  ) {
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

    this.users$ = this.afs
      .collection<User>('users', (ref) => {
        return ref.orderBy('displayName', 'asc');
      })
      .valueChanges({ idField: 'id' });

    this.users$.subscribe((users) => (this.users = users));

    this.filteredUsers$ = this.form.controls.clientId.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterUsers(state) : (this.users || []).slice()
      )
    );

    this.afs
      .collection('purchases')
      .valueChanges({ idField: 'id' })
      .subscribe((purchases) => {
        this.form.controls.billNumber.patchValue((purchases || []).length);
      });
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

  ngOnInit(): void {}
}