import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchedulersComponent } from './view-schedulers.component';

describe('ViewSchedulersComponent', () => {
  let component: ViewSchedulersComponent;
  let fixture: ComponentFixture<ViewSchedulersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSchedulersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
