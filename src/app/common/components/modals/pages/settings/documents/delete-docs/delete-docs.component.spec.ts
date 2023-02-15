import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDocsComponent } from './delete-docs.component';

describe('DeleteDocsComponent', () => {
  let component: DeleteDocsComponent;
  let fixture: ComponentFixture<DeleteDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
