import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/firestore';
import { Purchase } from 'src/app/models/purchase.model';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-purchases-chart',
  templateUrl: './purchases-chart.component.html',
  styleUrls: ['./purchases-chart.component.scss'],
})
export class PurchasesChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Ganancias' },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public amountOfPastMonths = 6;

  constructor(private afs: AngularFirestore) {
    this.generateLabels();

    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - this.amountOfPastMonths);
    minDate.setDate(1);

    this.afs
      .collection<Purchase>('purchases', (ref) => {
        return ref
          .where(
            'purchasedAt',
            '>=',
            firebase.firestore.Timestamp.fromDate(minDate)
          )
          .orderBy('purchasedAt', 'asc');
      })
      .valueChanges()
      .pipe(
        map((purchases) => {
          return purchases.map((purchase) => ({
            ...purchase,
            purchasedDate: purchase.purchasedAt.toDate(),
          }));
        })
      )
      .subscribe((purchases) => {
        const today = new Date();
        const newLineChartData = [];

        for (let i = this.amountOfPastMonths; i > 0; i -= 1) {
          const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const monthPurchases = purchases.filter((purchase) => {
            if (purchase.purchasedDate.getFullYear() === d.getFullYear()) {
              if (purchase.purchasedDate.getMonth() === d.getMonth()) {
                return true;
              }
            }
            return false;
          });

          newLineChartData.push(
            monthPurchases.reduce((acc, curr) => acc + curr.total, 0)
          );
        }

        const monthPurchases = purchases.filter((purchase) => {
          if (purchase.purchasedDate.getFullYear() === today.getFullYear()) {
            if (purchase.purchasedDate.getMonth() === today.getMonth()) {
              return true;
            }
          }
          return false;
        });

        newLineChartData.push(
          monthPurchases.reduce((acc, curr) => acc + curr.total, 0)
        );

        this.lineChartData = [{ data: newLineChartData, label: 'Ganancias' }];
      });
  }

  private generateLabels(): void {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const today = new Date();
    const newLineChartLabels = [];

    for (let i = this.amountOfPastMonths; i > 0; i -= 1) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = monthNames[d.getMonth()];
      newLineChartLabels.push(month);
    }

    newLineChartLabels.push(monthNames[today.getMonth()]);
    this.lineChartLabels = newLineChartLabels;
  }

  ngOnInit(): void {}
}
