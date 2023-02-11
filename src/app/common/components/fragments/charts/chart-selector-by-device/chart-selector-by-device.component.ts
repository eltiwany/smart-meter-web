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

  columns: any[] = [];
  sensors: any;
  sensorData: any;

  @Input() sensorsList: any[] = [];

  form = new FormGroup({
    'chartOption': new FormControl('line'),
    'sensor': new FormControl(),
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

  ngOnInit(): void {

  }

  getSensorData(sensor: any) {
    this.sensorData = [];
    this.columns = [];
    this.sensors = [];

    const sensorId = sensor.value;

    this.sensorsService.getUserSensorValuesPerSensor(sensorId).then((response) => {
      if (!response.error)
        this.sensorData = response.data[0];
        this.columns = this.sensorData.columns;
        this.sensors = this.sensorData.sensors;
      // console.table(this.columns);
    });
  }

}
