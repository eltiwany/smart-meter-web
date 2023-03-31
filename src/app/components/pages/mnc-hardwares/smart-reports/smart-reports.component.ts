import { SensorsService } from './../../../../services/iot/sensors.service';
import { SummaryReportsService } from './../../../../services/pages/reports/summary-reports.service';
import { UserBoardsService } from './../../../../services/iot/user-boards.service';
import { GeneralService } from './../../../../services/general.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart-reports',
  templateUrl: './smart-reports.component.html',
  styleUrls: ['./smart-reports.component.css']
})
export class SmartReportsComponent implements OnInit {

  fullName: string = "";
  data: any[] = [];
  sensors: any[] = [];
  power: any[] = [];
  powerWithLosses: any[] = [];
  columns: any[] = [];
  lossColumns: any[] = [];
  sensorData: any = [];
  dtOptions: DataTables.Settings = {};

  healthStatus: any = [];
  losses: any = [];

  reportsWithNumbersColumns = [
    {
      bgColor: 'primary',
      textColor: 'white',
      iconName: 'cpu-fill',
      allDataUrl: '#'
    },
    {
      bgColor: 'warning',
      textColor: 'dark',
      iconName: 'thermometer-sun',
      allDataUrl: '#'
    },
    {
      bgColor: 'info',
      textColor: 'white',
      iconName: 'lightbulb',
      allDataUrl: '#'
    },
    {
      bgColor: 'success',
      textColor: 'white',
      iconName: 'lightbulb',
      allDataUrl: '#'
    },
    {
      bgColor: 'info',
      textColor: 'white',
      iconName: 'lightbulb',
      allDataUrl: '#'
    },
    {
      bgColor: 'warning',
      textColor: 'dark',
      iconName: 'exclamation',
      allDataUrl: '#'
    },
    {
      bgColor: 'danger',
      textColor: 'white',
      iconName: 'exclamation',
      allDataUrl: '#'
    },
    {
      bgColor: 'danger',
      textColor: 'white',
      iconName: 'exclamation',
      allDataUrl: '#'
    },
    {
      bgColor: 'dark',
      textColor: 'white',
      iconName: 'check',
      allDataUrl: '#'
    },
  ];

  constructor(
    private auth:AuthService,
    public general: GeneralService,
    private reports: SummaryReportsService,
    private sensorsService: SensorsService
  ) { }

  ngOnInit(): void {
    this.fullName = this.auth.getAuth().name;

    this.reports.getBriefStats().then((response) => {
      if (!response.error)
        this.data = response.data;

      let newData: any[] = [];
      this.data.forEach((datum, index) => {
        newData.push([datum, this.reportsWithNumbersColumns[index]]);
      });

      this.data = newData;

    });

    this.getSensors();

    this.getHealthStatus();

    this.getTotalLosses();
  }

  getHealthStatus() {
    this.reports.getHealthStatus().then((response) => {
      if (!response.error)
        this.healthStatus = response.data;
    });
  }

  getTotalLosses() {
    this.reports.getTotalLosses().then((response) => {
      if (!response.error) {
        this.sensorData = response.data[0];
        this.columns = this.sensorData.columns;
        this.lossColumns = this.sensorData.loss_columns;
        this.sensors = this.sensorData.sensors;

        let powerData: any[] = [];
        let powerLossData: any[] = [];
        this.columns[0]['data'].forEach((v: number, index: number) => {
          powerData.push((v * this.columns[1]['data'][index]) / 1000);
          powerLossData.push((this.lossColumns[0]['data'][index] * this.lossColumns[1]['data'][index]) / 1000);
        });

        this.powerWithLosses = [
          {
            name: 'Power (kW)',
            data: powerData
          },
          {
            name: 'Losses (kW)',
            data: powerLossData
          }
        ]
      }

      console.log(this.powerWithLosses);
    });
  }

  getPower(values: any, loss = null) {
    if (loss)
      return values[1]?.average;
    if (typeof(values) == 'number')
      return values;
    if (values[0]?.runtime)
      return (values[0]?.average * values[1]?.average) * values[0]?.runtime;
    return values[0]?.average * values[1]?.average;
  }

  getSensors() {
    this.sensorsService.getAutoAddedUserSensors().then((response) => {
      if (!response.error)

      this.sensors = response.data;
      // console.table(this.data);
    });
  }

  getNoticationStatus(powerData: number[]) {
    let percent = Math.round((Math.max(...powerData) - Math.min(...powerData)) / Math.max(...powerData) * 100);
    if (percent > 5 && (powerData[0] < powerData[3]))
      return {
        'status': 'danger',
        'message': 'Appliance consumes more power!'
      }
    if (percent > 5 && (powerData[0] > powerData[3]))
      return {
        'status': 'warning',
        'message': 'Appliance uses lower power than normal!'
      }
    else
      return {
        'status': 'success',
        'message': 'Looks ok!'
      }
  }
}
