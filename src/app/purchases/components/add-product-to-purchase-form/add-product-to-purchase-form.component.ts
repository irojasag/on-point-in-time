import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import {
  ProductTypes,
  ProductTypeOptions,
  ProductExpirationFrequencyOptions,
  ProductExpirationFrequencies,
} from 'src/app/constants/product.constants';
import { MatDialogRef } from '@angular/material/dialog';
import { ReservatonScheduleService } from 'src/app/services/reservation-schedule/reservaton-schedule.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { getSundayCountBetweenDates } from 'src/app/helpers/general.helper';

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
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProductToPurchaseFormComponent>,
    private reservationScheduleService: ReservatonScheduleService,
    private productsService: ProductsService
  ) {
    this.setUpForm();

    this.products$ = this.productsService.products$;

    this.products$.subscribe((products) => (this.products = products));

    this.filteredProducts$ = this.form.controls.productId.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterProducts(state) : (this.products || []).slice()
      )
    );

    this.reservationScheduleService.reservationSchedules$.subscribe(
      (schedules) => {
        schedules = schedules || [];
        this.typeOptions = [];
        schedules.forEach((schedule) => {
          this.typeOptions.push({
            value: schedule.id,
            displayName: schedule.displayName,
          });
        });
        if (!this.form.controls.type.value) {
          this.form.controls.type.patchValue(this.typeOptions[0].value);
        }
      }
    );
  }

  private setUpForm(): void {
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
      reservationsPerDay: [
        1,
        Validators.compose([Validators.max(999999999999), Validators.min(1)]),
      ],
      reservationsPerWeek: [
        1,
        Validators.compose([Validators.max(999999999999), Validators.min(1)]),
      ],
      maxReservations: [
        1,
        Validators.compose([Validators.max(999999999999), Validators.min(1)]),
      ],
      needsPackages: [false],
      packages: [
        null,
        Validators.compose([Validators.max(999999999999), Validators.min(1)]),
      ],
      createdAt: [new Date()],
      expirationDate: [new Date()],
      startDate: [new Date()],
    });
    this.form.controls.expirationDate.disable();
    this.form.controls.startDate.disable();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.form.controls.startDate.patchValue(today);

    this.form.controls.startDate.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.updateExpirationDate();
      }, 300);
    });
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
    this.form.controls.reservationsPerWeek.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.updatemaxReservations();
      }, 300);
    });
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
    this.form.controls.maxReservations.patchValue(product.maxReservations || 1);
    this.form.controls.reservationsPerWeek.patchValue(
      product.reservationsPerWeek || 1
    );
    this.form.controls.reservationsPerDay.patchValue(
      product.reservationsPerDay || 1
    );
    this.form.controls.needsPackages.patchValue(product.needsPackages);
    this.form.controls.packages.patchValue(product.packages);
  }

  private updateExpirationDate(): void {
    const expirationDate = new Date(this.form.controls.startDate.value);
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
    expirationDate.setDate(expirationDate.getDate() - 1);
    this.form.controls.expirationDate.patchValue(expirationDate);
  }

  private updatemaxReservations(): void {
    const weeksCount = getSundayCountBetweenDates(
      new Date(this.form.controls.startDate.value),
      new Date(this.form.controls.expirationDate.value)
    );
    this.form.controls.maxReservations.patchValue(
      this.form.controls.reservationsPerWeek.value * weeksCount
    );
  }

  public saveProduct(): void {
    this.form.controls.productId.patchValue(this.selectedProduct.id);
    this.dialogRef.close(this.form.getRawValue());
  }
}
