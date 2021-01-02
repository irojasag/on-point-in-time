import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwaUpdateService {
  constructor(private readonly updates: SwUpdate) {
    this.updates.available.subscribe((event) => {
      console.log('update', event);
    });
  }

  public get hasUpdates$(): Observable<any> {
    return this.updates.available;
  }

  public doAppUpdate(): void {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
