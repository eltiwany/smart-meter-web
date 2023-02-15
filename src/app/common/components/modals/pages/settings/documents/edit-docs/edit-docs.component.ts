import { GeneralValidators } from './../../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { LoaderService } from './../../../../../../services/extras/loader.service';
import { SettingsService } from 'src/app/services/pages/settings.service';
import { ModalsService } from './../../../../../../services/layouts/modals.service';
import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../../../provider-class';

@Component({
  selector: 'app-edit-docs',
  templateUrl: './edit-docs.component.html',
  styleUrls: ['./edit-docs.component.css']
})
export class EditDocsComponent implements OnInit {
  data: any = [];

  constructor(
    private modal: ModalsService,
    private settings: SettingsService,
    private loader: LoaderService,
    public dataIn: ProviderClass
  ) { }

  form = new FormGroup({
    'name': new FormControl('', [GeneralValidators.required]),
    'description': new FormControl('', []),
  });

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }


  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.form.setControl('name', new FormControl(this.data.name, [GeneralValidators.required]));
      this.form.setControl('description', new FormControl(this.data.description, [GeneralValidators.required]));
    }
  }

  onSubmit = (): void => {
    const id: any = this.data.id;
    const data = {
      name: this.name?.value,
      description: this.description?.value,
    };
    this.settings.updateDocument(id, data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
