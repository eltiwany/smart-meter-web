import { GeneralValidators } from './../../../../validators/general.validators';
import { UsersService } from './../../../../services/pages/users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalsService } from './../../../../common/services/layouts/modals.service';
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
  time: any[] = [];
  power: any[] = [];
  powerWithLosses: any[] = [];
  columns: any[] = [];
  lossColumns: any[] = [];
  sensorData: any = [];
  dtOptions: DataTables.Settings = {};

  summaryByArea: any[] = [];

  cities: any;
  regions: any;
  districts: any;

  healthStatus: any = [];
  losses: any = [];

  myLatLng = { lat: -6.771481363166498, lng: 39.239863136461196 };// Map Options ,
  mapOptions: google.maps.MapOptions = {
    center: this.myLatLng,
    zoom: 15,
  };

  // markerOptions: google.maps.MarkerOptions = { icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless.png' };

  spots: { id: number; lat: number; lng: number }[] = [
    { id: 1, lat: 48.85952222328431, lng: 2.3347153257887454 },
    { id: 2, lat: 48.80528296155103, lng: 2.2111191343824954 },
    { id: 3, lat: 48.63132261107716, lng: 2.4308456968824954 },
    { id: 4, lat: 48.77633134372322, lng: 2.4665512632887454 },
    { id: 5, lat: 48.7871901580939, lng: 2.3127426695387454 },
  ];

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

  form = new FormGroup({
    'city': new FormControl(''),
    'region': new FormControl(''),
    'district': new FormControl(''),
    'startDate': new FormControl('', [GeneralValidators.required]),
    'endDate': new FormControl('', [GeneralValidators.required]),
  });

  constructor(
    private auth:AuthService,
    public general: GeneralService,
    private reports: SummaryReportsService,
    private sensorsService: SensorsService,
    public modal: ModalsService,
    private usersService: UsersService
  ) { }

  get city() {
    return this.form.get('city');
  }

  get region() {
    return this.form.get('region');
  }

  get district() {
    return this.form.get('district');
  }

  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  ngOnInit(): void {
    this.usersService.getUserResources().then((resources: any) => {
      if (!resources.error) {
        this.districts = resources.data.districts;
        this.regions = resources.data.regions;
        this.cities = resources.data.cities;
      }
    })

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

  getSummaryByArea() {
    let data = {
      "district": this.district?.value,
      "region": this.region?.value,
      "city": this.city?.value,
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
                loss: ((response.data[0].loss_columns[0]['data'][index] * response.data[0].loss_columns[1]['data'][index]) / 1000)
              }
            );
          });

        }
      })
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
        this.time = this.sensorData.columns[0]['time'].sort(function(a: number, b: number){return a-b});

        // console.log(this.time);

        let powerData: any[] = [];
        let powerLossData: any[] = [];

        this.columns[0]['data'].forEach((v: number, index: number) => {
          powerData.push({ x: this.time[index], y: ((v * this.columns[1]['data'][index]) / 1000) });
          powerLossData.push({ x: this.time[index], y: ((this.lossColumns[0]['data'][index] * this.lossColumns[1]['data'][index]) / 1000) });
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

      // console.log(this.powerWithLosses);
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
