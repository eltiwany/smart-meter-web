import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTestDataComponent } from './generate-test-data.component';

describe('GenerateTestDataComponent', () => {
  let component: GenerateTestDataComponent;
  let fixture: ComponentFixture<GenerateTestDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTestDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
