import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePaymentsComponent } from './delete-payments.component';

describe('DeletePaymentsComponent', () => {
  let component: DeletePaymentsComponent;
  let fixture: ComponentFixture<DeletePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
