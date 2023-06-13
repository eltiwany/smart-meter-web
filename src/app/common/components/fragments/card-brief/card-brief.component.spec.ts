import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBriefComponent } from './card-brief.component';

describe('CardBriefComponent', () => {
  let component: CardBriefComponent;
  let fixture: ComponentFixture<CardBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
