import { PreferencesService } from './../../../../common/services/preferences.service';
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
import { MapGeocoder } from '@angular/google-maps';
import { ConnectionService } from 'ng-connection-service';

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
  mapOptions: any;


  labelPosition: any;
  spots: { lat: number; lng: number, label: any, token: string, powerdata: any }[] = [
    // {
    //   lat: -6.767628316192537,
    //   lng: 39.22904076546204,
    //   label: 'Joseph Mtwange',
    //   token: '5yt4Ksz3',
    //   powerdata: {
    //     power: 1982,
    //     energy: 1212,
    //     losses: 21,
    //     powerlosses: 21,
    //   }
    // }
  ];
  spot: any = {};

  isConnected: boolean = true;
  constructor(
    private auth:AuthService,
    public general: GeneralService,
    private reports: SummaryReportsService,
    private sensorsService: SensorsService,
    public modal: ModalsService,
    private usersService: UsersService,
    private geocoder: MapGeocoder,
    private connection: ConnectionService,
    private preferences: PreferencesService
  ) {
    this.connection.monitor().subscribe(isConnected => {
      this.isConnected = isConnected.hasNetworkConnection;
      // console.log(isConnected);
      if (this.isConnected) {
        try {
          this.labelPosition = new google.maps.Point(25, 60);
          this.mapOptions = {
            center: this.myLatLng,
            zoom: 15,
          };
        } catch(e) {
          this.isConnected = false;
        }
      }
    })
   }

  selectMarker(spot: { lat: number; lng: number, label: string, token: string, powerdata: any }, content: any) {
    this.spot = spot;
    this.modal.open(content, 'lg');
  }

  sumValue(array: any[], key: string) {
    let num = array.reduce((prev, curr) => prev + Number(curr[key] ?? 0), 0);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  reportsWithNumbersColumns = [
    {
      bgColor: 'primary',
      textColor: 'white',
      iconName: 'cpu-fill',
      allDataUrl: '/user-boards'
    },
    {
      bgColor: 'warning',
      textColor: 'dark',
      iconName: 'thermometer-sun',
      allDataUrl: '/monitor-and-control/consumer-appliances'
    },
    {
      bgColor: 'info',
      textColor: 'white',
      iconName: 'lightbulb',
    },
    {
      bgColor: 'success',
      textColor: 'white',
      iconName: 'lightbulb',
    },
    {
      bgColor: 'info',
      textColor: 'white',
      iconName: 'lightbulb',
    },
    {
      bgColor: 'warning',
      textColor: 'dark',
      iconName: 'exclamation',
    },
    {
      bgColor: 'danger',
      textColor: 'white',
      iconName: 'exclamation',
    },
    {
      bgColor: 'danger',
      textColor: 'white',
      iconName: 'exclamation',
    },
    {
      bgColor: 'dark',
      textColor: 'white',
      iconName: 'check',
    },
  ];

  form = new FormGroup({
    'city': new FormControl(''),
    'region': new FormControl(''),
    'district': new FormControl(''),
    'startDate': new FormControl('', [GeneralValidators.required]),
    'endDate': new FormControl('', [GeneralValidators.required]),
  });

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

    if(this.isConnected)
      this.reports.getMapUserSummary().then((response) => {
        let usersWithCordinates = response.data;

        console.log(usersWithCordinates);
        usersWithCordinates.forEach((userWithPower: any) => {
          let cords = this.convertAddressToCoordinates(
                              userWithPower.user.city,
                              userWithPower.user.region,
                              userWithPower.user.district,
                              userWithPower.user.house_number,
                              userWithPower.user.name,
                              userWithPower.user.token,
                              userWithPower
                      );
          if (cords.lat != 0)
            this.spots.push(cords)
        });
    });

  }

  convertAddressToCoordinates(
    city: string,
    region: string,
    district: string,
    street: string,
    name: string,
    token: string,
    powerdata: any
  ): any {
    const address = `${city}, ${region}, ${district}, ${street} Tanzania`;
    const test = {
      lat: -6.778120338154011,
      lng: 39.24390420737638,
      label: 'Ali Saleh',
      token: '5yt4Ksz3',
      powerdata: {
        power: 1200,
        energy: 3120,
        losses: 0,
        losses_resistance: 0,
        powerlosses: 21,
      }
    }

    // return test;

    // this.geocoder.geocode({ address })
    //   .subscribe((results: any) => {
        // if (results.length > 0) {
          // const latitude = results[0].geometry.location.lat();
          // const longitude = results[0].geometry.location.lng();
          const coordinates = powerdata.user.coordinates.split(',');
          // console.log(coordinates);
          // return coordinates;
          const latitude = Number(coordinates[0]);
          const longitude = Number(coordinates[1]);


          let cord = {
            lat: latitude,
            lng: longitude,
            label: name,
            token: token,
            powerdata: {
              power: this.getPower(powerdata.power),
              energy: this.getPower(powerdata.energy),
              losses: powerdata.losses,
              losses_resistance: powerdata.losses_resistance,
              powerlosses: this.getPower(powerdata.powerlosses)
            }
          }

          // console.log(cord);
          return cord;
        // }

        // return test;

      // }, (error) => {
      //   return test
      // });
  }

  filterRegions() {
    this.regions = [];
    this.regions = this.preferences.getRegions().filter((city) => city.city == this.city?.value);
    this.region?.setValue(this.regions[0].name);
    this.filterDistricts();
  }

  filterDistricts() {
    this.districts = [];
    this.districts = this.regions.filter((region: any) => region.name == this.region?.value)[0].districts;
    this.district?.setValue(this.districts[0]);
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
        // this.time = this.sensorData.columns[0]['time'].sort(function(a: number, b: number){return a-b});

        // console.log(this.time);

        let powerData: any[] = [];
        let powerLossData: any[] = [];
        let loss: any, power: any;

        this.columns[0]['data'].forEach((v: number, index: number) => {
          if (index <= 11) {
            this.columns[0]['data']
            loss =
              (Math.abs(
                  ((this.columns[0]['data'][index + 1] * this.columns[1]['data'][index + 1]) / 1000) -
                  ((this.columns[0]['data'][index] * this.columns[1]['data'][index]) / 1000)
              )).toFixed(4);

            power = ((v * this.columns[1]['data'][index]) / 1000).toFixed(2);

            while (loss > power)
                  loss = (loss - power).toFixed(4);

            // console.log(
            //   [
            //     this.columns[0]['data'][index + 1] * this.columns[1]['data'][index + 1],
            //     this.columns[0]['data'][index] * this.columns[1]['data'][index]
            //   ]);

            powerData.push({ x: (index + 1), y: power });
            powerLossData.push({
              x: (index + 1),
              y: loss == 'NaN' ? 0 : loss
            });
          }
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

      // console.log(this.power, this.powerWithLosses);
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
