import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
const analytics = firebase.analytics;
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'on-point-in-time';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        analytics().setCurrentScreen(event.urlAfterRedirects);
        analytics().logEvent('page_view', {
          page_path: event.urlAfterRedirects,
        });
      });
  }
  ngOnInit(): void {}
}
