import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySmartReportsComponent } from './my-smart-reports.component';

describe('MySmartReportsComponent', () => {
  let component: MySmartReportsComponent;
  let fixture: ComponentFixture<MySmartReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySmartReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySmartReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
