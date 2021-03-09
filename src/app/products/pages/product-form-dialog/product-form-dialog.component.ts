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
import { ReservationSchedule } from 'src/app/models/reservation-schedule.model';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReservatonScheduleService } from 'src/app/services/reservation-schedule/reservaton-schedule.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
  public form: FormGroup;
  // Opciones desde los schedule
  public typeOptions = ProductTypeOptions;
  public expirationFrequencyOptions = ProductExpirationFrequencyOptions;

  public editMode: boolean;
  private productId: string;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reservationScheduleService: ReservatonScheduleService
  ) {
    this.generateForm();
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

  private generateForm(): void {
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
      reservationsPerDay: [
        1,
        Validators.compose([Validators.max(999999999999), Validators.min(1)]),
      ],
      reservationsPerWeek: [
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
    });
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 10);
    this.form.controls.createdAt.patchValue(newDate);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      if (data && data.editMode) {
        const productId: Observable<string> = this.activatedRoute.params.pipe(
          map((p) => p.id)
        );
        productId.subscribe((id) => {
          if (id) {
            this.productId = id;
            this.editMode = data.editMode;
            this.afs
              .doc<Product>(`products/${id}`)
              .valueChanges({ idField: 'id' })
              .subscribe((product) => {
                this.form.patchValue({
                  ...product,
                  expirationDate: product.expirationDate.toDate(),
                  createdAt: product.createdAt.toDate(),
                });
              });
          }
        });
      }
    });
  }

  public saveProductForm(): void {
    this.updateExpirationDate();
    if (this.editMode) {
      this.afs
        .doc(`products/${this.productId}`)
        .update(this.form.getRawValue())
        .then(() => {
          this.snackBar.open(
            `${this.form.value.name} ha sido actualizado`,
            '',
            {
              duration: 2000,
            }
          );
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        })
        .catch((err) => {
          console.log('error', err);
        });
    } else {
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
