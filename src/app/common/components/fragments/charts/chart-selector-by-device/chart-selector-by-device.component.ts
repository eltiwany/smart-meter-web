import { GeneralValidators } from './../../../../../validators/general.validators';
import { SensorsService } from './../../../../../services/iot/sensors.service';
import { FunctionsService } from './../../../../services/extras/functions.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-selector-by-device',
  templateUrl: './chart-selector-by-device.component.html',
  styleUrls: ['./chart-selector-by-device.component.css']
})
export class ChartSelectorByDeviceComponent implements OnInit, OnChanges {

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sensorsList.length > 0) {
      // console.log(this.sensorsList[0].sensor.id);
      this.sensor?.setValue(this.sensorsList[0].sensor.id);
      this.getSensorData({value: this.sensorsList[0].sensor.id});
    }
  }

  setSelectedColumns() {
    this.form.setControl('selectedColumns', new FormControl('', [GeneralValidators.required]));

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
        this.sensors = this.sensorData.sensors;
        this.time = this.sensorData.columns[0]['time'].sort(function(a: number, b: number){return a-b});


        let powerData: any[] = [];
        let powerLossData: any[] = [];
        let loss: any, power: any;

        this.columns[0]['data'].forEach((v: number, index: number) => {
          if (index < 12) {
            loss =
                (Math.abs(
                    ((this.columns[0]['data'][index + 1] * this.columns[1]['data'][index + 1]) / 1000) -
                    ((this.columns[0]['data'][index] * this.columns[1]['data'][index]) / 1000)
                )).toFixed(4);

            power = ((v * this.columns[1]['data'][index]) / 1000).toFixed(2);

            while (loss > power)
                  loss = (loss - power).toFixed(4);

            powerData.push({ x: (index + 1), y: power });
            powerLossData.push({
              x: (index + 1),
              y: isNaN(loss) ? 0 : loss
            });
          }
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

        console.log(this.power, this.powerWithLosses);
      }

      this.setSelectedColumns();

    });
  }

}
