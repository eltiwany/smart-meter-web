import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceDocsComponent } from './delete-service-docs.component';

describe('DeleteServiceDocsComponent', () => {
  let component: DeleteServiceDocsComponent;
  let fixture: ComponentFixture<DeleteServiceDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteServiceDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServiceDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
