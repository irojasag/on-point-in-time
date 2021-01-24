import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ProductTypeOptions,
  ProductExpirationFrequencyOptions,
  ProductExpirationFrequencies,
  ProductTypes,
} from '../../../constants/product.constants';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
  public form: FormGroup;
  public typeOptions = ProductTypeOptions;
  public expirationFrequencyOptions = ProductExpirationFrequencyOptions;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
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
      isPublic: [false],
      expirationAmunt: [
        null,
        Validators.compose([
          Validators.required,
          Validators.max(999999999999),
          Validators.min(1),
        ]),
      ],
      expirationFrequency: [null, Validators.required],
      categories: [],
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
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 10);
    this.form.controls.createdAt.patchValue(newDate);
  }

  ngOnInit(): void {}

  public saveProductForm(): void {
    this.updateExpirationDate();
    this.afs
      .collection('products')
      .add(this.form.value)
      .then(() => {
        this.snackBar.open(`${this.form.value.name} ha sido añadido`, '', {
          duration: 2000,
        });
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      })
      .catch((err) => {
        console.log('error', err);
      });
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
}
