import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSchedulersComponent } from './delete-schedulers.component';

describe('DeleteSchedulersComponent', () => {
  let component: DeleteSchedulersComponent;
  let fixture: ComponentFixture<DeleteSchedulersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSchedulersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
