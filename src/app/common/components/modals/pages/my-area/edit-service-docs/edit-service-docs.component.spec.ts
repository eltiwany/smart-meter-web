import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceDocsComponent } from './edit-service-docs.component';

describe('EditServiceDocsComponent', () => {
  let component: EditServiceDocsComponent;
  let fixture: ComponentFixture<EditServiceDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
