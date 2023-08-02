import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSchedulersComponent } from './smart-schedulers.component';

describe('SmartSchedulersComponent', () => {
  let component: SmartSchedulersComponent;
  let fixture: ComponentFixture<SmartSchedulersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartSchedulersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
