import { BoardsService } from './../../../../services/iot/boards.service';
import { PreferencesService } from './../../../../common/services/preferences.service';
import { ModalsService } from './../../../../common/services/layouts/modals.service';
import { UsersService } from './../../../../services/pages/users.service';
import { GeneralValidators } from './../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { SensorsService } from './../../../../services/iot/sensors.service';
import { SummaryReportsService } from './../../../../services/pages/reports/summary-reports.service';
import { UserBoardsService } from './../../../../services/iot/user-boards.service';
import { GeneralService } from './../../../../services/general.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-my-smart-reports',
  templateUrl: './my-smart-reports.component.html',
  styleUrls: ['./my-smart-reports.component.css']
})
export class MySmartReportsComponent implements OnInit {
  fullName: string = "";
  data: any[] = [];
  currentData: any = [];
  resistanceData: any = [];
  sensors: any[] = [];
  sensorData: any = [];
  dtOptions: DataTables.Settings = {};
  availableUnits: number = 0;
  // @ViewChild('smartApplianceReports') smartApplianceReports: ElementRef;

  healthStatus: any = [];
  summaryByArea: any[] = [];
  thresholdPercent: number = 5;

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

  form = new FormGroup({
    'startDate': new FormControl('', [GeneralValidators.required]),
    'endDate': new FormControl('', [GeneralValidators.required]),
  });


  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  constructor(
    private auth:AuthService,
    public general: GeneralService,
    private reports: SummaryReportsService,
    private sensorsService: SensorsService,
    public modal: ModalsService,
    private usersService: UsersService,
    private preferences: PreferencesService,
    private userBoard: BoardsService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.fullName = this.auth.getAuth().name;

    this.userBoard.getUserBoards().then((response) => {
      if (!response.error)
        this.availableUnits = response.data[0].board.available_units;
        console.log(this.availableUnits);
    });

    this.reports.getUserBriefStats().then((response) => {
      if (!response.error)
        this.data = response.data;

      let newData: any[] = [];
      this.data.forEach((datum, index) => {
        newData.push([datum, this.reportsWithNumbersColumns[index]]);
      });

      this.data = newData;
      // console.log(this.data);

    });

    this.getSensors();

    this.getHealthStatus();

    this.preferences.getPreference('thresholdPercent').then(response => {
      this.thresholdPercent = response?.data?.value ?? 5;
    })
  }

  sumValue(array: any[], key: string) {
    let num = array.reduce((prev, curr) => prev + Number(curr[key] ?? 0), 0);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  getSummaryByArea() {
    let data = {
      "startDate": this.startDate?.value,
      "endDate": this.endDate?.value,
    };

    if (this.startDate?.valid && this.endDate?.valid)
      this.usersService.getAreaReports(data).then((response) => {
        this.summaryByArea = [];
        if (!response.error) {
          let time = response.data[0].columns[0]['time'].sort(function(a: number, b: number){return a-b});

          response.data[0].columns[0]['data'].forEach((v: number, index: number) => {
            this.summaryByArea.push(
              {
                time: time[index],
                power: ((v * response.data[0].columns[1]['data'][index]) / 1000),
                loss: (Math.abs((v * (response.data[0].columns[1]['data'][index + 1] ?? response.data[0].columns[1]['data'][index]) / 1000) - (v * response.data[0].columns[1]['data'][index] / 1000))).toFixed(4),
                // loss: ((response.data[0].loss_columns[0]['data'][index] * response.data[0].loss_columns[1]['data'][index]) / 1000),
                earthing: (response.data[0].earthing_columns[0]['data'][index]),
                earthing_resistance: (response.data[0].earthing_resistance_columns[0]['data'][index])
              }
            );
          });

        }
      })
  }

  printDiv(divName: string) {
    const printContents = (document?.getElementById(divName) as HTMLElement).innerHTML;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    // Extract print styles from the bundled styles
    const styles = Array.from(document.querySelectorAll('style'));
    styles.forEach((style) => {
      printWindow?.document.head.appendChild(style.cloneNode(true));
    });

    printWindow?.document.close();

    printWindow?.addEventListener('afterprint', () => {
      printWindow?.close();
      // Restore JavaScript functionalities here
    });

    printWindow?.print();

  }

  getHealthStatus() {
    this.reports.getHealthStatus().then((response) => {
      if (!response.error)
        this.healthStatus = response.data;

        this.currentData = this.healthStatus.filter((curr: any) => curr.si == 'A');
        this.resistanceData = this.healthStatus.filter((curr: any) => curr.si == 'Ω');
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

  getNoticationPowerStatus() {
    let powerOk = true;
    this.healthStatus.forEach((power: any) => {
      if (this.getNoticationStatus(power.statuses, power.sensor.threshold, power.sensor.threshold_percentage, power.si).status != 'success' && power.si == 'W')
        powerOk = false;
    });

    if (powerOk)
      return {
        status: 'success',
        message: 'Appliances operate on optimal power'
      }
    else
      return {
        status: 'warning',
        message: 'Power issue detected on some appliances'
      }
  }

  getNoticationStatus(powerData: number[], threshold = 0, threshold_percentage = 0, si: string = 'W') {
    let percent = Math.round((Math.max(...powerData) - Math.min(...powerData)) / (Math.max(...powerData) + Math.min(...powerData)) * 100);

    let threshold_plus = Number(threshold) + (Number(threshold) * (Number(threshold_percentage) / 100))
    let threshold_minus = Number(threshold) - (Number(threshold) * (Number(threshold_percentage) / 100))

    if (si == 'Ω') {
      let resistanceData = powerData[3];
      if (resistanceData <= 2.5)
        return {
          'status': 'success',
          'message': 'Earthing resistance OK'
        }

      else if (resistanceData > 10000)
        return {
          'status': 'danger',
          'message': 'Disconnected ground system'
        }

      else
        return {
          'status': 'warning',
          'message': 'Check ground system for service'
        }
    }

    if (si == 'A') {
      let groundCurrentData = powerData[3];
      if (groundCurrentData > 0)
        return {
          'status': 'warning',
          'message': 'Check electrical network for short circuit, open circuit and earth fault'
        }

      else
        return {
          'status': 'success',
          'message': 'Earthing fault current OK'
        }
    }

    if (threshold) {
      if (powerData[3] > threshold_plus)
        return {
          'status': 'danger',
          'message': 'Service the appliance'
        }

      else if (powerData[3] > (2 * threshold_plus))
        return {
          'status': 'danger',
          'message': 'Consider replace the appliance'
        }

      else
        return {
          'status': 'success',
          'message': 'Power is normal'
        }
    }

    if (percent > this.thresholdPercent && (powerData[0] < powerData[3]))
      return {
        'status': 'danger',
        'message': 'Power is higher than acceptable'
      }

    if (percent > this.thresholdPercent && (powerData[0] > powerData[3]))
      return {
        'status': 'warning',
        'message': 'Power is lower than acceptable'
      }

    else
      return {
        'status': 'success',
        'message': 'Power is normal'
      }

  }

  scrollToReport() {
    this.viewportScroller.scrollToAnchor('smartApplianceReports')
  }

}
