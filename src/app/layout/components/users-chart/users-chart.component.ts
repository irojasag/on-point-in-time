import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss'],
})
export class UsersChartComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Usuarios Activos', 'Usuarios Bloqueados'];
  public pieChartData: SingleDataSet = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public totalUsers: number;
  public totalActiveUsers: number;
  public totalLockedUsers: number;

  constructor(private usersService: UserService) {
    this.usersService.users$.subscribe((users) => {
      this.totalLockedUsers = users.filter((u) => u.locked).length;
      this.totalActiveUsers = users.filter((u) => !u.locked).length;
      this.totalUsers = users.length;
      this.pieChartData = [this.totalActiveUsers, this.totalLockedUsers];
    });
  }

  ngOnInit(): void {}
}
