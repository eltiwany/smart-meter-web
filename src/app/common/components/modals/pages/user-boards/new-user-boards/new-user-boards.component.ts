import { UsersService } from './../../../../../../services/pages/users.service';
import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { BoardStateService } from './../../../../../../services/iot/board-state.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { ApiService } from './../../../../../services/api/api.service';
import { BoardsService } from './../../../../../../services/iot/boards.service';
import { FunctionsService } from './../../../../../services/extras/functions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user-boards',
  templateUrl: './new-user-boards.component.html',
  styleUrls: ['./new-user-boards.component.css']
})
export class NewUserBoardsComponent implements OnInit {
  data: any;
  users: any;
  datum: any;

  constructor(
    public fn: FunctionsService,
    private usersService: UsersService,
    private boardsService: BoardsService,
    public api: ApiService,
    public loader: LoaderService,
    public modal: ModalsService,
    private boardState: BoardStateService
  ) {}

  form = new FormGroup({
    'userId': new FormControl('', [GeneralValidators.required]),
    'boardId': new FormControl('', [GeneralValidators.required]),
  });

  get userId() {
    return this.form.get('userId');
  }

  get boardId() {
    return this.form.get('boardId');
  }

  ngOnInit(): void {
    this.getUsers();
    this.getBoards();
  }

  getBoards() {
    return this.boardsService.getBoardsUnfiltered().then((response) => {
      if (!response.error) {
        this.data = response.data;
      }
    });
  }

  getUsers() {
    return this.usersService.getUsersUnfiltered().then((response) => {
      if (!response.error) {
        this.users = response.data;
      }
    });
  }

  previewBoard() {
    this.datum = (this.data as []).filter((datum: any) => datum.board.id == this.boardId?.value);
  }

  filterPins(pins: any[], pinType: string) {
    return pins.filter(pin => pin.pin_type == pinType);
  }

  onSubmit = (): void => {
    const data = {
      userId: this.userId?.value,
      boardId: this.boardId?.value,
      token: this.fn.generateString(16)
    };

    this.boardsService.newUserBoard(data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.boardState.getActiveBoard();
        this.loader.refresh();
      }
    });
  }
}
