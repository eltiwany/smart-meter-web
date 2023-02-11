import { EditSensorsComponent } from './../../../../common/components/modals/pages/link-hardwares/sensors/edit-sensors/edit-sensors.component';
import { FunctionsService } from './../../../../common/services/extras/functions.service';
import { ApiService } from './../../../../common/services/api/api.service';
import { ViewConfigSensorsComponent } from './../../../../common/components/modals/pages/config-hardwares/config-sensors/view-config-sensors/view-config-sensors.component';
import { AppConfigService } from './../../../../common/services/app-config.service';
import { DeleteSensorsComponent } from './../../../../common/components/modals/pages/link-hardwares/sensors/delete-sensors/delete-sensors.component';
import { SensorsService } from './../../../../services/iot/sensors.service';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-auto-sensors',
  templateUrl: './auto-sensors.component.html',
  styleUrls: ['./auto-sensors.component.css']
})
export class AutoSensorsComponent implements OnInit {

  modalEditComponent: Type<any>;
  modalViewComponent: Type<any>;
  modalDeleteComponent: Type<any>;

  data: any[] | any = [];

  constructor(
    private sensorsService: SensorsService,
    public config: AppConfigService,
    public api: ApiService,
    public fn: FunctionsService
  ) {
    // Initialize modals for new, edit and delete
    this.modalEditComponent = EditSensorsComponent;
    this.modalViewComponent = ViewConfigSensorsComponent;
    this.modalDeleteComponent = DeleteSensorsComponent;
  }

  ngOnInit(): void {
    this.getSensors();
  }

  getSensors() {
    this.sensorsService.getAutoAddedUserSensors().then((response) => {
      if (!response.error)
        this.data = response.data;
      // console.table(this.data);
    });
  }

}
