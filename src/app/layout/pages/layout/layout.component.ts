import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PwaUpdateService } from 'src/app/services/pwa-update/pwa-update.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public isSidebarOpen: boolean;
  constructor(
    public auth: AuthService,
    public updatesService: PwaUpdateService
  ) {}

  ngOnInit(): void {}
}
