import { ApiService } from './api/api.service';
import { PreferencesService } from './preferences.service';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(
    private preference: PreferencesService,
    private api: ApiService
  ) {
    this.getPreferences();
  }

  getPreferences() {
    this.app.logoUrl = 'assets/images/smartmetertz.png';
    this.preference.getPreferences().then((response) => {
      if (!response.error) {
        response.data.forEach((dataSet: any) => {
          // Change system name
          if (dataSet.key == 'systemName')
            this.app.name = dataSet.value;
          // Change IT Support Number
          if (dataSet.key == 'itSupport')
            this.website.itSupport.phoneNumber = dataSet.value;
          //  Set system logo and favicon (image on topbar)
          if (dataSet.key == 'organizationLogo') {
            this.app.logoUrl = this.api.storageHost + dataSet.value;
            // @ts-ignore
            let favIcon: HTMLLinkElement = document.querySelector('#appIcon');
            favIcon.href = this.api.storageHost + dataSet.value;
          }
        });
      }
    });
  }

  app = {
    name: 'Smart Meter TZ',
    longName: 'Smart Meter TZ',
    heading: [
      'Your home is now smart',
      'with smart meter ⚡'
    ],
    description: `
                  This platform allows users to manage hardware projects easily and efficiently
                  simply by registering through the platform and connect with hardware sensors,
                  and other components through graphical user interface, this should allow
                  innovative ideas to be implemented easier without hassle of manually
                  implementing codes
                `,
    logoUrl: 'assets/images/smartmetertz.png',
  }

  website = {
    frontImageUrl: 'assets/images/blob-scene-haikei.svg',
    itSupport: {
      name: 'Ali Abdulla Saleh',
      phoneNumber: '0777464655',
    }
  }

  preferences = {
    companyName: 'Nafuutronics',
    imageSelector: 'assets/images/upload-image.svg',
    imageSelectorBoard: 'assets/images/devices/board.svg',
    imageSelectorSensor: 'assets/images/devices/sensor.svg',
    imageSelectorActuator: 'assets/images/devices/actuator.svg',
    imageConnect: 'assets/images/connect-arrow.svg',
  }

  monthsList = [
    {
      number: 1,
      name: 'January'
    },
    {
      number: 2,
      name: 'February'
    },
    {
      number: 3,
      name: 'March'
    },
    {
      number: 4,
      name: 'April'
    },
    {
      number: 5,
      name: 'May'
    },
    {
      number: 6,
      name: 'June'
    },
    {
      number: 7,
      name: 'July'
    },
    {
      number: 8,
      name: 'August'
    },
    {
      number: 9,
      name: 'September'
    },
    {
      number: 10,
      name: 'October'
    },
    {
      number: 11,
      name: 'November'
    },
    {
      number: 12,
      name: 'December'
    },
  ];

}
