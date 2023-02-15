import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocsComponent } from './new-docs.component';

describe('NewDocsComponent', () => {
  let component: NewDocsComponent;
  let fixture: ComponentFixture<NewDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
