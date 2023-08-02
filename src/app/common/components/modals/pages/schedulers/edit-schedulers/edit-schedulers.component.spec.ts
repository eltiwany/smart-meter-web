import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedulersComponent } from './edit-schedulers.component';

describe('EditSchedulersComponent', () => {
  let component: EditSchedulersComponent;
  let fixture: ComponentFixture<EditSchedulersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchedulersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
