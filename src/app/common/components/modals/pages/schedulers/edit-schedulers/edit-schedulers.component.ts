import { ProviderClass } from 'src/app/common/components/modals/provider-class';
import { ActuatorsService } from './../../../../../../services/iot/actuators.service';
import { FunctionsService } from './../../../../../services/extras/functions.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { AutomationsService } from './../../../../../../services/iot/automations.service';
import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { SensorsService } from './../../../../../../services/iot/sensors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-schedulers',
  templateUrl: './edit-schedulers.component.html',
  styleUrls: ['./edit-schedulers.component.css']
})
export class EditSchedulersComponent implements OnInit {
  data: any;
  userSensors: any[] = [];

  selectors = {
    userSensor: '-- Select Smart Appliance --',
  }

  constructor(
    public fn: FunctionsService,
    private userSensorService: SensorsService,
    private automationsService: AutomationsService,
    private modal: ModalsService,
    private loader: LoaderService,
    private dataIn: ProviderClass
  ) { }

  form = new FormGroup({
    'userSensor': new FormControl(this.selectors.userSensor, [GeneralValidators.required, GeneralValidators.isNot(this.selectors.userSensor)]),
    'fromTime': new FormControl('', [GeneralValidators.required]),
    'toTime': new FormControl('', [GeneralValidators.required]),
    'isSwitchedOn': new FormControl('', [GeneralValidators.required]),
  });

  get userSensor() {
    return this.form.get('userSensor');
  }

  get fromTime() {
    return this.form.get('fromTime');
  }

  get toTime() {
    return this.form.get('toTime');
  }
  
  get isSwitchedOn() {
    return this.form.get('isSwitchedOn');
  }

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.getUserSensors();
      // console.log(this.data);
      this.form.setControl('userSensor', new FormControl(this.data?.sensor_id, [GeneralValidators.required, GeneralValidators.isNot(this.selectors.userSensor)]))
      this.form.setControl('fromTime', new FormControl(this.data?.from_time, [GeneralValidators.required]));
      this.form.setControl('toTime', new FormControl(this.data?.to_time, [GeneralValidators.required]));
      this.form.setControl('isSwitchedOn', new FormControl(this.data?.is_switched_on, [GeneralValidators.required]));
    }
  }

  getUserSensors() {
    this.userSensorService.getAutoAddedUserSensors().then((response: any) => {
      if (!response.error)
        this.userSensors = response.data;
    }).finally(
      // () => console.log(this.userSensors)
    );
  }

  onSubmit = (): void => {
    const data = {
      userSensorId: this.userSensor?.value,
      fromTime: this.fromTime?.value,
      toTime: this.toTime?.value,
      isSwitchedOn: this.isSwitchedOn?.value,
    };
    // console.log(data);

    this.automationsService.updateScheduler(this.data?.id, data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }
}
