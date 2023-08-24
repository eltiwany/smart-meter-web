import { PreferencesService } from './../../../../../services/preferences.service';
import { UsersService } from './../../../../../../services/pages/users.service';
import { AuthValidators } from './../../../../../../validators/auth.validators';
import { FunctionsService } from './../../../../../services/extras/functions.service';
import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/pages/settings.service';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css']
})
export class NewUsersComponent implements OnInit {

  districts: any[] = [];
  regions: any[] = [];
  cities: any[] = [];

  roles: any[] = [];
  selectors = {
    role: '-- Select Role --'
  }

  constructor(
    private modal: ModalsService,
    private users: UsersService,
    private settings: SettingsService,
    private loader: LoaderService,
    public fn: FunctionsService,
    private preferences: PreferencesService
  ) {}

  form = new FormGroup({
    'name': new FormControl('', [GeneralValidators.required]),
    'phone_number': new FormControl(''),
    'city': new FormControl(''),
    'region': new FormControl(''),
    'district': new FormControl(''),
    'house_number': new FormControl(''),
    'residence_id': new FormControl(''),
    'coordinates': new FormControl(),
    'email': new FormControl('', [AuthValidators.email]),
    'roleId': new FormControl(this.selectors.role, [GeneralValidators.required, GeneralValidators.isNot(this.selectors.role)]),
  });

  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }

  get phone_number() {
    return this.form.get('phone_number');
  }

  get city() {
    return this.form.get('city');
  }

  get region() {
    return this.form.get('region');
  }

  get district() {
    return this.form.get('district');
  }

  get house_number() {
    return this.form.get('house_number');
  }

  get residence_id() {
    return this.form.get('residence_id');
  }

  get coordinates() {
    return this.form.get('coordinates');
  }

  get roleId() {
    return this.form.get('roleId');
  }

  ngOnInit(): void {
    this.getRoles();
    this.cities = this.preferences.getRegions().filter((obj, index, self) => index == self.findIndex(item => item.city == obj.city));
  }

  getRoles() {
    return this.settings.getRolesUnfiltered().then((response) => {
      if (!response.error) {
        this.roles = response.data;
      }
    });
  }

  filterRegions() {
    this.regions = [];
    this.regions = this.preferences.getRegions().filter((city) => city.city == this.city?.value);
    this.region?.setValue(this.regions[0].name);
    this.filterDistricts();
  }

  filterDistricts() {
    this.districts = [];
    this.districts = this.regions.filter((region) => region.name == this.region?.value)[0].districts;
    this.district?.setValue(this.districts[0]);
  }

  onSubmit = (): void => {
    const data = {
      email: this.email?.value,
      name: this.name?.value,
      phone_number: this.phone_number?.value,
      city: this.city?.value,
      region: this.region?.value,
      district: this.district?.value,
      house_number: this.house_number?.value,
      residence_id: this.residence_id?.value,
      coordinates: this.coordinates?.value,
      roleId: this.roleId?.value,
      password: 'user12345',
    };
    // console.log(data);

    this.users.newUser(data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
