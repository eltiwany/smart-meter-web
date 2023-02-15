import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceDocsComponent } from './view-service-docs.component';

describe('ViewServiceDocsComponent', () => {
  let component: ViewServiceDocsComponent;
  let fixture: ComponentFixture<ViewServiceDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
