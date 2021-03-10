import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-actions-bottom-sheet',
  templateUrl: './product-actions-bottom-sheet.component.html',
  styleUrls: ['./product-actions-bottom-sheet.component.scss'],
})
export class ProductActionsBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProductActionsBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Product,
    private snackBar: MatSnackBar,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

  public deleteData(event: MouseEvent): void {
    this.productsService.deleteProduct(this.data.id).then(() => {
      this.bottomSheetRef.dismiss();
      this.snackBar.open(`${this.data.name} ha sido eliminado`, '', {
        duration: 2000,
      });
    });

    event.preventDefault();
  }
}
