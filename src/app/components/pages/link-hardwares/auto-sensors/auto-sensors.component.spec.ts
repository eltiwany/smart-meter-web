import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSensorsComponent } from './auto-sensors.component';

describe('AutoSensorsComponent', () => {
  let component: AutoSensorsComponent;
  let fixture: ComponentFixture<AutoSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoSensorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
