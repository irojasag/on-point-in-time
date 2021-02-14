import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  public reports = [
    {
      displayName: 'Reporte de ventas',
      icon: 'fas fa-money-bill-wave',
    },
    {
      displayName: 'Reporte de ventas',
      icon: 'fas fa-money-bill-wave',
    },
    {
      displayName: 'Reporte de ventas',
      icon: 'fas fa-money-bill-wave',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
