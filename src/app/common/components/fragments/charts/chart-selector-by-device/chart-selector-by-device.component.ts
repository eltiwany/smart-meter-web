import { SensorsService } from './../../../../../services/iot/sensors.service';
import { FunctionsService } from './../../../../services/extras/functions.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-selector-by-device',
  templateUrl: './chart-selector-by-device.component.html',
  styleUrls: ['./chart-selector-by-device.component.css']
})
export class ChartSelectorByDeviceComponent implements OnInit {

  // selectedColumns: any[] = [];
  columns: any[] = [];
  power: any[] = [];
  powerWithLosses: any[] = [];
  lossColumns: any[] = [];
  sensors: any;
  time: any[] = [];
  sensorData: any;

  @Input() sensorsList: any[] = [];

  form = new FormGroup({
    'chartOption': new FormControl('line'),
    'sensor': new FormControl(),
    'reportType': new FormControl('usage_losses'),
    'selectedColumns': new FormControl([]),
  });

  constructor(
    public fn: FunctionsService,
    private sensorsService: SensorsService
  ) { }

  get chartOption() {
    return this.form.get('chartOption');
  }

  get sensor() {
    return this.form.get('sensor');
  }

  get reportType() {
    return this.form.get('reportType');
  }

  get selectedColumns() {
    return this.form.get('selectedColumns');
  }

  ngOnInit(): void {

  }

  setSelectedColumns() {
    this.selectedColumns?.setValue([]);
    let tmp = this.chartOption?.value;
    this.chartOption?.setValue('no-chart');

    switch (this.reportType?.value) {
      case 'usage_sa':
        this.selectedColumns?.setValue(this.columns);
        break;
      case 'usage_power':
        this.selectedColumns?.setValue(this.power);
        break;
      case 'usage_losses':
        this.selectedColumns?.setValue(this.powerWithLosses);
        break;
      default:
        this.selectedColumns?.setValue(this.columns);
    }
    // this.chartOption?.setValue(tmp);
  }

  getSensorData(sensor: any) {
    this.sensorData = [];
    this.columns = [];
    this.lossColumns = [];
    this.sensors = [];

    const sensorId = sensor.value;

    this.sensorsService.getUserSensorValuesPerSensor(sensorId).then((response) => {
      if (!response.error) {
        this.sensorData = response.data[0];
        this.columns = this.sensorData.columns;
        this.lossColumns = this.sensorData.loss_columns;
        this.sensors = this.sensorData.sensors;
        this.time = this.sensorData.columns[0]['time'].sort(function(a: number, b: number){return a-b});

        let powerData: any[] = [];
        let powerLossData: any[] = [];
        this.columns[0]['data'].forEach((v: number, index: number) => {
          powerData.push({ x: this.time[index], y: ((v * this.columns[1]['data'][index]) / 1000) });
          powerLossData.push({ x: this.time[index], y: ((this.lossColumns[0]['data'][index] * this.lossColumns[1]['data'][index]) / 1000) });
        });

        this.power = [
          {
            name: 'Power (kW)',
            data: powerData
          }
        ]

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

      this.setSelectedColumns();

    });
  }

}
