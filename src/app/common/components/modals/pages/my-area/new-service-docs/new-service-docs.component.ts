import { AlertService } from './../../../../../services/extras/alert.service';
import { ServiceDocumentsService } from './../../../../../../services/pages/my-area/service-documents.service';
import { GeneralValidators } from './../../../../../../validators/general.validators';
import { SettingsService } from 'src/app/services/pages/settings.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { AppConfigService } from './../../../../../services/app-config.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-service-docs',
  templateUrl: './new-service-docs.component.html',
  styleUrls: ['./new-service-docs.component.css']
})
export class NewServiceDocsComponent implements OnInit {

  file: {link: string, file: any, name: string} = {link: "", file: undefined, name: ""};
  data: any;
  datum: any;

  constructor(
    private settingsService: SettingsService,
    private docsService: ServiceDocumentsService,
    public loader: LoaderService,
    public modal: ModalsService,
    public config: AppConfigService,
    public alert: AlertService
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
