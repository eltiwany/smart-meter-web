import { UsersService } from './../../../../../../services/pages/users.service';
import { AuthValidators } from './../../../../../../validators/auth.validators';
import { FunctionsService } from './../../../../../services/extras/functions.service';
import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/pages/settings.service';
import { ProviderClass } from '../../../provider-class';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  data: any;
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
    private dataIn: ProviderClass
  ) {}

  form = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone_number': new FormControl(),
    'city': new FormControl(),
    'region': new FormControl(),
    'district': new FormControl(),
    'house_number': new FormControl(),
    'residence_id': new FormControl(),
    'coordinates': new FormControl(),
    'roleId': new FormControl(),
  });

  get name() {
    return this.form.get('name');
  }
 
  get email() {
    return this.form.get('email');
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
    if (this.dataIn) {
      this.data = this.dataIn;
      this.form.setControl('name', new FormControl(this.data.name, [GeneralValidators.required]));
      this.form.setControl('email', new FormControl(this.data.email, [GeneralValidators.required]));
      this.form.setControl('phone_number', new FormControl(this.data.phone_number));
      this.form.setControl('city', new FormControl(this.data.city));
      this.form.setControl('region', new FormControl(this.data.region));
      this.form.setControl('district', new FormControl(this.data.district));
      this.form.setControl('house_number', new FormControl(this.data.house_number));
      this.form.setControl('residence_id', new FormControl(this.data.residence_id));
      this.form.setControl('coordinates', new FormControl(this.data.coordinates));
      this.form.setControl('roleId', new FormControl(this.data.role_id, [GeneralValidators.required, GeneralValidators.isNot(this.selectors.role)]));
    }
    this.getRoles();
  }

  getRoles() {
    return this.settings.getRolesUnfiltered().then((response) => {
      if (!response.error) {
        this.roles = response.data;
      }
    });
  }

  onSubmit = (): void => {
    const data = {
      name: this.name?.value,
      email: this.email?.value,
      roleId: this.roleId?.value,
      phone_number: this.phone_number?.value,
      city: this.city?.value,
      region: this.region?.value,
      district: this.district?.value,
      house_number: this.house_number?.value,
      residence_id: this.residence_id?.value,
      coordinates: this.coordinates?.value,
    };
    // console.log(data);

    this.users.updateUser(this.data?.id, data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
