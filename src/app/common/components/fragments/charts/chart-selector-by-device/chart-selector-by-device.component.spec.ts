import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSelectorByDeviceComponent } from './chart-selector-by-device.component';

describe('ChartSelectorByDeviceComponent', () => {
  let component: ChartSelectorByDeviceComponent;
  let fixture: ComponentFixture<ChartSelectorByDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSelectorByDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSelectorByDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
