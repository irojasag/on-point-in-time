import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesChartComponent } from './purchases-chart.component';

describe('PurchasesChartComponent', () => {
  let component: PurchasesChartComponent;
  let fixture: ComponentFixture<PurchasesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
