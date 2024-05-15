import { TicketsService } from 'src/app/services/tickets/pages/tickets.service';
import { BoardStateService } from './../../../../../../services/iot/board-state.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { BoardsService } from './../../../../../../services/iot/boards.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../../provider-class';

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})
export class DeleteTicketComponent implements OnInit {

  form = new FormGroup({
    ticketId: new FormControl('')
  });

  data: any
  constructor(
    private modal: ModalsService,
    private ticketService: TicketsService,
    private loader: LoaderService,
    public dataIn: ProviderClass,
    private boardState: BoardStateService
  ) { }

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.form.setControl('ticketId', new FormControl(this.data.id));
    }
  }

  get ticketId() {
    return this.form.get('ticketId');
  }

  onSubmit() {
    this.ticketService.deleteTicket(this.ticketId?.value).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.boardState.getActiveBoard();
        this.loader.refresh();
      }
    });
  }

}
