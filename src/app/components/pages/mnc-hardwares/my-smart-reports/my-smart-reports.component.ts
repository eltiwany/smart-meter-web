import { SensorsService } from './../../../../services/iot/sensors.service';
import { SummaryReportsService } from './../../../../services/pages/reports/summary-reports.service';
import { UserBoardsService } from './../../../../services/iot/user-boards.service';
import { GeneralService } from './../../../../services/general.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-smart-reports',
  templateUrl: './my-smart-reports.component.html',
  styleUrls: ['./my-smart-reports.component.css']
})
export class MySmartReportsComponent implements OnInit {
  fullName: string = "";
  data: any[] = [];
  sensors: any[] = [];
  sensorData: any = [];
  dtOptions: DataTables.Settings = {};

  healthStatus: any = [];

  reportsWithNumbersColumns = [
    {
      bgColor: 'info',
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
      bgColor: 'success',
      textColor: 'white',
      iconName: 'lightbulb',
      allDataUrl: '#'
    },
    {
      bgColor: 'danger',
      textColor: 'white',
      iconName: 'exclamation',
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

    this.reports.getUserBriefStats().then((response) => {
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
  }

  getHealthStatus() {
    this.reports.getHealthStatus().then((response) => {
      if (!response.error)
        this.healthStatus = response.data;
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

  getNoticationStatus(powerData: number[], threshold = 0, threshold_percentage = 0) {
    let percent = Math.round((Math.max(...powerData) - Math.min(...powerData)) / Math.max(...powerData) * 100);

    let threshold_plus = Number(threshold) + (Number(threshold) * (Number(threshold_percentage) / 100))
    let threshold_minus = Number(threshold) - (Number(threshold) * (Number(threshold_percentage) / 100))

    if (threshold) {
      console.table({power: powerData[3], plus: threshold_plus, minus: threshold_minus})
      if (powerData[3] > threshold_plus)
        return {
          'status': 'danger',
          'message': 'Higher usage than recommended'
        }
      else if (powerData[3] < threshold_minus)
        return {
          'status': 'warning',
          'message': 'Lower usage than recommended'
        }
      else
        return {
          'status': 'success',
          'message': 'Normal'
        }
    }

    if (percent > 5 && (powerData[0] < powerData[3]))
      return {
        'status': 'danger',
        'message': 'Higher usage than normal'
      }
    if (percent > 5 && (powerData[0] > powerData[3]))
      return {
        'status': 'warning',
        'message': 'Lower usage than normal'
      }
    else
      return {
        'status': 'success',
        'message': 'Normal'
      }

  }

}
