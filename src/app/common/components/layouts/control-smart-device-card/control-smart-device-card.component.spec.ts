import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSmartDeviceCardComponent } from './control-smart-device-card.component';

describe('ControlSmartDeviceCardComponent', () => {
  let component: ControlSmartDeviceCardComponent;
  let fixture: ComponentFixture<ControlSmartDeviceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSmartDeviceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSmartDeviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
