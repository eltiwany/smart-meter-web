import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSchedulersComponent } from './new-schedulers.component';

describe('NewSchedulersComponent', () => {
  let component: NewSchedulersComponent;
  let fixture: ComponentFixture<NewSchedulersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSchedulersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
