import { GeneralValidators } from './../../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { LoaderService } from './../../../../../../services/extras/loader.service';
import { SettingsService } from 'src/app/services/pages/settings.service';
import { ModalsService } from './../../../../../../services/layouts/modals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-docs',
  templateUrl: './new-docs.component.html',
  styleUrls: ['./new-docs.component.css']
})
export class NewDocsComponent implements OnInit {

  constructor(
    private modal: ModalsService,
    private settings: SettingsService,
    private loader: LoaderService
  ) { }

  form = new FormGroup({
    'name': new FormControl('', [GeneralValidators.required]),
    'description': new FormControl('', [GeneralValidators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }


  ngOnInit(): void {
  }

  onSubmit = (): void => {
    const data = {
      name: this.name?.value,
      description: this.description?.value,
    };
    this.settings.newDocument(data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
