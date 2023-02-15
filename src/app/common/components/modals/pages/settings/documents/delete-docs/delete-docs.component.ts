import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { SettingsService } from 'src/app/services/pages/settings.service';
import { ModalsService } from './../../../../../../services/layouts/modals.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../../../provider-class';

@Component({
  selector: 'app-delete-docs',
  templateUrl: './delete-docs.component.html',
  styleUrls: ['./delete-docs.component.css']
})
export class DeleteDocsComponent implements OnInit {

  form = new FormGroup({
    documentId: new FormControl('')
  });

  data: any
  constructor(
    private modal: ModalsService,
    private settings: SettingsService,
    private loader: LoaderService,
    public dataIn: ProviderClass
  ) { }

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.form.setControl('documentId', new FormControl(this.data.id));
    }
  }

  get documentId() {
    return this.form.get('documentId');
  }

  onSubmit() {
    this.settings.deleteDocument(this.documentId?.value).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
