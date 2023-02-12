import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserBoardsComponent } from './view-user-boards.component';

describe('ViewUserBoardsComponent', () => {
  let component: ViewUserBoardsComponent;
  let fixture: ComponentFixture<ViewUserBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
