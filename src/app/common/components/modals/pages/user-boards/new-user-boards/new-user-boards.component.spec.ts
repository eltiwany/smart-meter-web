import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserBoardsComponent } from './new-user-boards.component';

describe('NewUserBoardsComponent', () => {
  let component: NewUserBoardsComponent;
  let fixture: ComponentFixture<NewUserBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
