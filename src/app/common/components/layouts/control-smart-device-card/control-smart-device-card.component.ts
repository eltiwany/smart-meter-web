import { SensorsService } from './../../../../services/iot/sensors.service';
import { ActuatorsService } from './../../../../services/iot/actuators.service';
import { ModalsService } from './../../../services/layouts/modals.service';
import { AppConfigService } from './../../../services/app-config.service';
import { Component, Input, OnInit, Injector } from '@angular/core';
import { ProviderClass } from '../../modals/provider-class';

@Component({
  selector: 'app-control-smart-device-card',
  templateUrl: './control-smart-device-card.component.html',
  styleUrls: ['./control-smart-device-card.component.css']
})
export class ControlSmartDeviceCardComponent implements OnInit {

  checked: any[] = [];

  @Input() imageUrl: string = this.config.preferences.imageSelector;
  @Input() iconName: string = "plus-circle-fill";
  @Input() color: "tertiary" | "primary" | "success" | "info" | "dark" | "warning" = "tertiary";

  @Input() isImage: boolean = false;

  @Input() deviceName: string = "Device Name";
  @Input() deviceId: number = 0;
  @Input() isSwitchedOn: boolean = false;
  @Input() isActiveLow: boolean = false;

  dataInjected: any = {};
  @Input() heading = "View Device";
  @Input() headingDelete = "Delete Device";

  @Input() showStatus: boolean = true;

  @Input() textButton: boolean = false;

  @Input() link: boolean = true;
  @Input() linkMessage: string = "Click the \"plus\" icon to link a device.";

  @Input() token: string = "";
  @Input() interval: string = "";

  @Input() connections: any[] = [];
  @Input() columns: any[] = [];

  // @ts-ignore
  @Input() modalContent: Type<any>;
  @Input() modalSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';

  @Input() deleteAction: boolean = false;
  // @ts-ignore
  @Input() modalDeleteContent: Type<any>;
  @Input() modalDeleteSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';

  @Input() editAction: boolean = false;
  // @ts-ignore
  @Input() modalEditContent: Type<any>;
  @Input() modalEditSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';

  onChecked(input: any, id: number, fromDiv = false) {
    // console.log(input.target.value, input.target.checked, id);
    if (fromDiv)
      input.target.checked = !input.target.checked;
    this.checked[id] = this.isSwitchedOn = this.isActiveLow ? !input.target.checked : input.target.checked;

    let data = {
      'userSensorId': id,
      'isSwitchedOn': this.isActiveLow ? !input.target.checked : input.target.checked,
    }
    console.log(input.target.value, this.isSwitchedOn, this.isActiveLow, !this.isSwitchedOn && this.isActiveLow);
    this.sensorsService.switchActuator(data).then((response) => {
      if(response.error) {
        this.checked[id] = !this.checked[id];
        input.target.checked = !input.target.checked;
      }
    });
  }

  // Data for View & Edit
  @Input() data: any = [];

  constructor(
    private config: AppConfigService,
    public modalService: ModalsService,
    private sensorsService: SensorsService,
    private injector: Injector,
  ) {}

  ngOnInit(): void {
    this.dataInjected = this.createInjector(this.data);
  }

  createInjector(dataObj: any) {
    // The ProviderClass is really just a stub, but is
    // neccessary for injection to work.
    return Injector.create(
      [{ provide: ProviderClass, useValue: dataObj }],
      this.injector
    );
  }

}
