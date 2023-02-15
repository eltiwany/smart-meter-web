import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceDocsComponent } from './new-service-docs.component';

describe('NewServiceDocsComponent', () => {
  let component: NewServiceDocsComponent;
  let fixture: ComponentFixture<NewServiceDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewServiceDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
