import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/common/services/extras/functions.service';
import { ProviderClass } from '../../../provider-class';
import { TicketsService } from 'src/app/services/tickets/pages/tickets.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  data: any;
  threads: any;

  constructor(
    public fn: FunctionsService,
    private dataIn: ProviderClass,
    private tickets: TicketsService
  ) {}

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.getThread(this.data.id);
    }
  }

  getThread(ticketId: number) {
    this.tickets.getTicketThread(ticketId).then((response: any) => {
      if (!response.error)
        this.threads = response.data;
    })
  }

}
