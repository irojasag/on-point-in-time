import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map } from 'rxjs/operators';
import {
  ProductTypes,
  ProductTypeOptions,
  ProductExpirationFrequencyOptions,
  ProductExpirationFrequencies,
} from 'src/app/constants/product.constants';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-to-purchase-form',
  templateUrl: './add-product-to-purchase-form.component.html',
  styleUrls: ['./add-product-to-purchase-form.component.scss'],
})
export class AddProductToPurchaseFormComponent implements OnInit {
  public products$: Observable<Product[]>;
  public filteredProducts$: Observable<Product[]>;
  public products: Product[];
  public selectedProduct: Product;

  public typeOptions = ProductTypeOptions;
  public expirationFrequencyOptions = ProductExpirationFrequencyOptions;

  public form: FormGroup;
  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProductToPurchaseFormComponent>
  ) {
    this.form = this.formBuilder.group({
      productId: [null, Validators.required],

      type: [ProductTypes.MEMBERSHIP, Validators.required],
      name: [null, Validators.required],
      price: [
        null,
        Validators.compose([
          Validators.required,
          Validators.max(999999999999),
          Validators.min(0),
        ]),
      ],
      expirationAmunt: [
        null,
        Validators.compose([
          Validators.required,
          Validators.max(999999999999),
          Validators.min(1),
        ]),
      ],
      expirationFrequency: [null, Validators.required],
      needsReservationsPerWeek: [false],
      reservationsPerWeek: [
        null,
        Validators.compose([Validators.max(999999999999), Validators.min(1)]),
      ],
      needsPackages: [false],
      packages: [
        null,
        Validators.compose([Validators.max(999999999999), Validators.min(1)]),
      ],
      createdAt: [new Date()],
      expirationDate: [new Date()],
    });
    this.form.controls.expirationDate.disable();

    this.form.controls.expirationAmunt.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.updateExpirationDate();
      }, 300);
    });
    this.form.controls.expirationFrequency.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.updateExpirationDate();
      }, 300);
    });

    this.products$ = this.afs
      .collection<Product>('products')
      .valueChanges({ idField: 'id' });

    this.products$.subscribe((products) => (this.products = products));

    this.filteredProducts$ = this.form.controls.productId.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterProducts(state) : (this.products || []).slice()
      )
    );
  }

  ngOnInit(): void {}

  private _filterProducts(value: string): Product[] {
    const filterValue = (value || '').toLowerCase();

    return (this.products || []).filter(
      (product) => product.name.toLowerCase().indexOf(filterValue) !== -1
    );
  }

  public selectProduct(product: Product): void {
    this.selectedProduct = product;

    this.form.controls.type.patchValue(product.type);
    this.form.controls.name.patchValue(product.name);
    this.form.controls.price.patchValue(product.price);
    this.form.controls.expirationAmunt.patchValue(1);
    this.form.controls.expirationFrequency.patchValue(
      ProductExpirationFrequencies.MONTHS
    );
    this.form.controls.needsReservationsPerWeek.patchValue(
      product.needsReservationsPerWeek
    );
    this.form.controls.reservationsPerWeek.patchValue(
      product.reservationsPerWeek
    );
    this.form.controls.needsPackages.patchValue(product.needsPackages);
    this.form.controls.packages.patchValue(product.packages);
  }

  private updateExpirationDate(): void {
    const expirationDate = new Date();
    const multiplier = this.form.value.expirationAmunt;
    const frequency = this.form.value.expirationFrequency;
    switch (frequency) {
      case ProductExpirationFrequencies.DAYS:
        expirationDate.setDate(multiplier + expirationDate.getDate());
        break;
      case ProductExpirationFrequencies.WEEKS:
        expirationDate.setDate(multiplier * 7 + expirationDate.getDate());
        break;
      case ProductExpirationFrequencies.MONTHS:
        expirationDate.setMonth(multiplier + expirationDate.getMonth());
        break;
      case ProductExpirationFrequencies.YEARS:
        expirationDate.setFullYear(multiplier + expirationDate.getFullYear());
        break;
      default:
        break;
    }
    this.form.controls.expirationDate.patchValue(expirationDate);
  }

  public saveProduct(): void {
    this.form.controls.productId.patchValue(this.selectedProduct.id);
    this.dialogRef.close(this.form.getRawValue());
  }
}
