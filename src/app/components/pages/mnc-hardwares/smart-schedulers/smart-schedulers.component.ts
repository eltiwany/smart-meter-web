import { FunctionsService } from './../../../../common/services/extras/functions.service';
import { AutomationsService } from './../../../../services/iot/automations.service';
import { DeleteSchedulersComponent } from './../../../../common/components/modals/pages/schedulers/delete-schedulers/delete-schedulers.component';
import { EditSchedulersComponent } from './../../../../common/components/modals/pages/schedulers/edit-schedulers/edit-schedulers.component';
import { ViewSchedulersComponent } from './../../../../common/components/modals/pages/schedulers/view-schedulers/view-schedulers.component';
import { NewSchedulersComponent } from './../../../../common/components/modals/pages/schedulers/new-schedulers/new-schedulers.component';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-smart-schedulers',
  templateUrl: './smart-schedulers.component.html',
  styleUrls: ['./smart-schedulers.component.css']
})
export class SmartSchedulersComponent implements OnInit {

  modalComponent: Type<any>;
  modalViewComponent: Type<any>;
  modalEditComponent: Type<any>;
  modalDeleteComponent: Type<any>;

  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = [
    'id', 
    'sensor_name',
    'from_time',
    'to_time',
    'is_switched_on',
];

  constructor(
    private automation: AutomationsService,
    public fn: FunctionsService
  ) {
    // Initialize modals for new, edit and delete
    this.modalComponent = NewSchedulersComponent;
    this.modalViewComponent = ViewSchedulersComponent;
    this.modalEditComponent = EditSchedulersComponent;
    this.modalDeleteComponent = DeleteSchedulersComponent;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.automation.getSchedulers(dataTablesParameters)
          .then(response => {
              // console.log(response.data);

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
        { data: 'sensor_name' },
        { data: 'from_time' },
        { data: 'to_time' },
        { data: 'is_switched_on' },
        { data: '', orderable: false}
      ],
      responsive: true
    };
  }
}
