import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from './../../../../../services/extras/alert.service';
import { AppConfigService } from './../../../../../services/app-config.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { ServiceDocumentsService } from './../../../../../../services/pages/my-area/service-documents.service';
import { SettingsService } from 'src/app/services/pages/settings.service';
import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../../provider-class';

@Component({
  selector: 'app-edit-service-docs',
  templateUrl: './edit-service-docs.component.html',
  styleUrls: ['./edit-service-docs.component.css']
})
export class EditServiceDocsComponent implements OnInit {
  file: {link: string, file: any, name: string} = {link: "", file: undefined, name: ""};
  data: any;
  dataEdit: any;
  datum: any;

  constructor(
    private settingsService: SettingsService,
    private docsService: ServiceDocumentsService,
    public loader: LoaderService,
    public modal: ModalsService,
    public config: AppConfigService,
    public alert: AlertService,
    public dataIn: ProviderClass
  ) {}

  form = new FormGroup({
    'documentId': new FormControl('', [GeneralValidators.required]),
    'filePath': new FormControl('', [GeneralValidators.required]),
  });

  get documentId() {
    return this.form.get('documentId');
  }

  get filePath() {
    return this.form.get('filePath');
  }

  ngOnInit(): void {
    this.getDocuments();
    if (this.dataIn) {
      this.dataEdit = this.dataIn;
      this.form.setControl('documentId', new FormControl(this.dataEdit.document_id, [GeneralValidators.required]));
    }
  }

  getDocuments() {
    this.settingsService.getDocumentsUnfiltered().then((response) => {
      if (!response.error) {
        this.data = response.data;
      }
    });
  }

  validateFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let extension = event.target.files[0].type.split('/').pop().toLowerCase();
      let size = event.target.files[0].size;

      if (
        extension == "pdf"
      ) {
        if (size < 1000000) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            // console.log(event.srcElement.files[0]);

              this.file = {
                  link: _event.target.result,
                  file: event.srcElement.files[0],
                  name: event.srcElement.files[0].name
              };
          };
          reader.readAsDataURL(event.target.files[0]);
        }else
          this.alert.showError('File should not exceed 1MB in size!');
      }else
        this.alert.showError('Only PDF File is Allowed!');
    }
  }

  onSubmit = (): void => {
    const formData = new FormData();
    formData.append('id', this.dataEdit?.id);
    formData.append('filePath', this.file.file);
    formData.append('documentId', this.documentId?.value);

    this.docsService.newDocument(formData).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
