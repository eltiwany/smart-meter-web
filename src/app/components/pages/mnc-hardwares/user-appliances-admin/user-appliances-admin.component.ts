import { SensorsService } from './../../../../services/iot/sensors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-appliances-admin',
  templateUrl: './user-appliances-admin.component.html',
  styleUrls: ['./user-appliances-admin.component.css']
})
export class UserAppliancesAdminComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = [
    "id",
    "full_name",
    "phone_number",
    "email",
    "city",
    "region",
    "district",
    "id",
    "name",
    "user_defined_name",
    "threshold",
    "is_switched_on",
    "is_active_low",
    "threshold_percentage",
    "description",
    "image_url",
    "interval",
  ];

  constructor(
    private userSensor: SensorsService,
  ) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.userSensor.getuserSensorsDT(dataTablesParameters)
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
        { data: "id" },
        { data: "user_defined_name" },
        { data: "is_switched_on" },
        { data: "threshold", orderable: false },
        { data: "full_name" },
        { data: "email" },
        { data: "city" },
        { data: "region" },
        { data: "district" },
      ],
      responsive: true
    };
  }

}
