import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productInfo$: Observable<Product[]>;
  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private afs: AngularFirestore
  ) {
    this.productInfo$ = this.afs
      .collection<Product>('products')
      .valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {}

  public openAddDialog(): void {
    this.dialog.open(ProductFormDialogComponent, {
      height: '400px',
      width: '300px',
    });
  }
}
