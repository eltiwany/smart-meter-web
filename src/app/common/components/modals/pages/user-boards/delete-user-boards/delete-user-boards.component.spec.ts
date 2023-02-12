import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserBoardsComponent } from './delete-user-boards.component';

describe('DeleteUserBoardsComponent', () => {
  let component: DeleteUserBoardsComponent;
  let fixture: ComponentFixture<DeleteUserBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
