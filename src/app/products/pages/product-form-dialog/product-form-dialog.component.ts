import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ProductTypeOptions,
  ProductExpirationFrequencyOptions,
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
      type: [null, Validators.required],
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
    });
  }

  ngOnInit(): void {}

  public saveProductForm(): void {
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
}
