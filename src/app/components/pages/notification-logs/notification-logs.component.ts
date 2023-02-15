import { MessagesService } from './../../../services/pages/messages.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-logs',
  templateUrl: './notification-logs.component.html',
  styleUrls: ['./notification-logs.component.css']
})
export class NotificationLogsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  data: any[] = [];

  constructor(
    private messages: MessagesService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:25,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.messages.getMessages(dataTablesParameters)
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
        { data: 'id' },
        { data: 'name' },
        { data: 'phone_number' },
        { data: 'description' },
        { data: 'created_at' }
      ],
      responsive: true,
      order: [1, 'asc']
    };
  }

}
