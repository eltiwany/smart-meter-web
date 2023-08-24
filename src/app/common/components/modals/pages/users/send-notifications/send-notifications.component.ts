import { PreferencesService } from './../../../../../services/preferences.service';
import { UsersService } from './../../../../../../services/pages/users.service';
import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { SettingsService } from './../../../../../../services/pages/settings.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.css']
})
export class SendNotificationsComponent implements OnInit {

  districts: any[] = [];
  regions: any[] = [];

  constructor(
    private modal: ModalsService,
    private settings: UsersService,
    private loader: LoaderService,
    private preferences: PreferencesService
  ) { }

  form = new FormGroup({
    'message': new FormControl('', [GeneralValidators.required]),
    'region': new FormControl('', [GeneralValidators.required]),
    'district': new FormControl('', [GeneralValidators.required]),
  });

  get message() {
    return this.form.get('message');
  }

  get region() {
    return this.form.get('region');
  }

  get district() {
    return this.form.get('district');
  }

  ngOnInit(): void {
    this.regions = this.preferences.getRegions();
  }

  filterDistricts() {
    this.districts = [];
    this.districts = this.regions.filter((region) => region.name == this.region?.value)[0].districts;
    this.district?.setValue(this.districts[0]);
  }

  onSubmit = (): void => {
    const data = {
      message: this.message?.value,
      region: this.region?.value,
      district: this.district?.value,
    };
    this.settings.sendNotification(data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }
}
