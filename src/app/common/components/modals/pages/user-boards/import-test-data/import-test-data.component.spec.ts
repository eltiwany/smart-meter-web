import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTestDataComponent } from './import-test-data.component';

describe('ImportTestDataComponent', () => {
  let component: ImportTestDataComponent;
  let fixture: ComponentFixture<ImportTestDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportTestDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
