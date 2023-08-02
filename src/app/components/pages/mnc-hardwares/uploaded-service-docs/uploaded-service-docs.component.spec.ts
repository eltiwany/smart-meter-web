import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedServiceDocsComponent } from './uploaded-service-docs.component';

describe('UploadedServiceDocsComponent', () => {
  let component: UploadedServiceDocsComponent;
  let fixture: ComponentFixture<UploadedServiceDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedServiceDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedServiceDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
