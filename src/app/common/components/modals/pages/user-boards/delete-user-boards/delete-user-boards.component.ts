import { BoardStateService } from './../../../../../../services/iot/board-state.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { BoardsService } from './../../../../../../services/iot/boards.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../../provider-class';

@Component({
  selector: 'app-delete-user-boards',
  templateUrl: './delete-user-boards.component.html',
  styleUrls: ['./delete-user-boards.component.css']
})
export class DeleteUserBoardsComponent implements OnInit {

  form = new FormGroup({
    boardId: new FormControl('')
  });

  data: any
  constructor(
    private modal: ModalsService,
    private boardService: BoardsService,
    private loader: LoaderService,
    public dataIn: ProviderClass,
    private boardState: BoardStateService
  ) { }

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.form.setControl('boardId', new FormControl(this.data.board_id));
    }
  }

  get boardId() {
    return this.form.get('boardId');
  }

  onSubmit() {
    this.boardService.deleteUserBoard(this.boardId?.value).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.boardState.getActiveBoard();
        this.loader.refresh();
      }
    });
  }

}
