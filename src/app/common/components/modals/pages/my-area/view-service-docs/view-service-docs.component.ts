import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from './../../../../../services/api/api.service';
import { AppConfigService } from './../../../../../services/app-config.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { Component, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { ProviderClass } from '../../../provider-class';

@Component({
  selector: 'app-view-service-docs',
  templateUrl: './view-service-docs.component.html',
  styleUrls: ['./view-service-docs.component.css']
})
export class ViewServiceDocsComponent implements OnInit {

  data: any;
  fileUrl: any;

  constructor(
    public loader: LoaderService,
    public modal: ModalsService,
    public config: AppConfigService,
    public dataIn: ProviderClass,
    public api: ApiService,
    private sanitizer: DomSanitizer
  ) {  }

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.setSafeURL((this.api.storageHost + this.data.file_path));
    }
  }

  setSafeURL(url: string) {
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
