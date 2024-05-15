import { Component, OnInit, Type } from '@angular/core';
import { DeleteTicketComponent } from 'src/app/common/components/modals/pages/tickets/delete-ticket/delete-ticket.component';
import { UpdateTicketComponent } from 'src/app/common/components/modals/pages/tickets/update-ticket/update-ticket.component';
import { ViewTicketComponent } from 'src/app/common/components/modals/pages/tickets/view-ticket/view-ticket.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TicketsService } from 'src/app/services/tickets/pages/tickets.service';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {

  modalViewComponent: Type<any>;
  modalEditComponent: Type<any>;
  modalDeleteComponent: Type<any>;

  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = [ 'id', 'ticket_number', 'reported_by', 'location', 'status', 'contact', 'description' ];

  constructor(
    private tickets: TicketsService,
    private auth: AuthService
  ) {
    // Initialize modals for new, edit and delete
    this.modalViewComponent = ViewTicketComponent;
    this.modalEditComponent = UpdateTicketComponent;
    this.modalDeleteComponent = DeleteTicketComponent;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        // console.log(Object.assign({userId: this.auth.getAuth().user_id }, dataTablesParameters));
        this.tickets.getTickets( dataTablesParameters)
          .then(response => {
              this.data = response.data;
              callback({
                recordsTotal: response.recordsTotal,
                recordsFiltered: response.recordsFiltered,
                data: []
              });
            });
      },
      columns: [
        // { data: 'id' },
        { data: 'ticket_number' },
        { data: 'reported_by' },
        { data: 'description', width: '200px' },
        { data: 'location' },
        { data: 'status' },
        { data: 'contact' },
        { data: 'created_at' },
        // { data: 'description' },
        { data: '', orderable: false}
      ],
      responsive: true
    };
  }

}
