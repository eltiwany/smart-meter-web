import { GeneralValidators } from './../../../../../../../validators/general.validators';
import { LoaderService } from './../../../../../../services/extras/loader.service';
import { ModalsService } from './../../../../../../services/layouts/modals.service';
import { SensorsService } from './../../../../../../../services/iot/sensors.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../../../provider-class';

@Component({
  selector: 'app-edit-sensors',
  templateUrl: './edit-sensors.component.html',
  styleUrls: ['./edit-sensors.component.css']
})
export class EditSensorsComponent implements OnInit {

  data: any;
  constructor(
    public dataIn: ProviderClass,
    private sensorsService: SensorsService,
    private modal: ModalsService,
    private loader: LoaderService
  ) { }

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    interval: new FormControl(''),
    threshold: new FormControl(''),
    threshold_percentage: new FormControl('')
  });

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  get interval() {
    return this.form.get('interval');
  }

  get threshold() {
    return this.form.get('threshold');
  }

  get threshold_percentage() {
    return this.form.get('threshold_percentage');
  }


  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.form.setControl('id', new FormControl(this.data.sensor.id, [GeneralValidators.required]));
      this.form.setControl('name', new FormControl(this.data.sensor.user_defined_name, [GeneralValidators.required]));
      this.form.setControl('interval', new FormControl(this.data.sensor.interval, [GeneralValidators.required]));
      this.form.setControl('threshold', new FormControl(this.data.sensor.threshold, [GeneralValidators.required]));
      this.form.setControl('threshold_percentage', new FormControl(this.data.sensor.threshold_percentage, [GeneralValidators.required, GeneralValidators.isPercentage]));

      console.log(this.form);

    }
  }

  onSubmit = (): void => {
    const data = {
      'id': this.id?.value,
      'name': this.name?.value,
      'interval': this.interval?.value,
      'threshold': this.threshold?.value,
      'threshold_percentage': this.threshold_percentage?.value,
    };
    // console.log(data);

    this.sensorsService.updateUserSensor(this.data?.sensor?.id, data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
