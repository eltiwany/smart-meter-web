import { BoardStateService } from './../../../../services/iot/board-state.service';
import { PreferencesService } from './../../../services/preferences.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FunctionsService } from './../../../services/extras/functions.service';
import { PermissionsGuardService } from './../../../../services/guards/permissions-guard.service';
import { UrlService } from './../../../services/extras/url.service';
import { ExportOptionsService } from './../../../services/export-options.service';
import { ModalsService } from './../../../services/layouts/modals.service';
import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { ButtonsService } from './../../../services/layouts/buttons.service';
import { AppConfigService } from './../../../services/app-config.service';
import { Component, Input, Type, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface importInterface {
  importData(data: any): Promise<any>;
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  // @ts-ignore
  importedDataFile: any = [];

  dtOptions: any[] = [];
  urls: any;

  // Accepted columns for imported file
  @Input() importColumns = [];
  // @ts-ignore
  @Input() importService: importInterface;
  @Input() importButton  = false;
  @Input() importButtonName  = "Import Data From Excel/CSV";
  // @ts-ignore
  @Input() importModalContent: Type<any>;

  @Input() sdlButton  = false;

  // @ts-ignore
  @Input() modalConfirmContent: Type<any>;
  @Input() confirmAllButton  = false;
  @Input() confirmAllButtonName  = "Confirm All Employees";

  // @ts-ignore
  @Input() modalClearLogsContent: Type<any>;
  @Input() clearLogsButton  = false;
  @Input() clearLogsButtonName  = 'Clear Logs';
  @Input() clearLogsButtonIcon  = 'trash';

  @Input() exportOptions = false;
  @Input() newButton  = false;
  @Input() newButtonName  = "New Item";

  // @ts-ignore
  @Input() modalContent: Type<any>;
  @Input() modalSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';
  @Input() dataArray: any[] = [];
  @Input() colsArray: any[] = [];

  // @ts-ignore
  @Input() messageModalContent: Type<any>;
  @Input() messageButton = false;
  @Input() messageButtonName = "Send Notification";

  constructor(
    public config: AppConfigService,
    public route: ActivatedRoute,
    public router: Router,
    public buttons: ButtonsService,
    private loader: LoaderService,
    public modal: ModalsService,
    public exportService: ExportOptionsService,
    public url: UrlService,
    public permission: PermissionsGuardService,
    public fn: FunctionsService,
    private boardState: BoardStateService
  ) {}

  ngOnInit(): void {
  }

  refresh() {
    this.loader.refresh();
  }

  // importFileData(): void {
  //   if (this.file.length !== 0) {
  //     this.importService.importData(this.importedDataFile).then((response) => {
  //       if (!response.error) {
  //         this.modal.close();
  //         this.refresh();
  //       }
  //     });
  //   }
  // }

}
