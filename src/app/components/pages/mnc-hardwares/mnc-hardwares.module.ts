import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MyCommonModule } from 'src/app/common/common.module';
import { FragmentsModule } from './../../../common/components/fragments/fragments.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutsModule } from './../../../common/components/layouts/layouts.module';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MncHardwaresRoutingModule } from './mnc-hardwares-routing.module';
import { AutomateHardwaresComponent } from './automate-hardwares/automate-hardwares.component';
import { MonitorHardwaresComponent } from './monitor-hardwares/monitor-hardwares.component';
import { ControlActuatorsComponent } from './control-actuators/control-actuators.component';
import { SmartReportsComponent } from './smart-reports/smart-reports.component';
import { MySmartReportsComponent } from './my-smart-reports/my-smart-reports.component';
import { UploadedServiceDocsComponent } from './uploaded-service-docs/uploaded-service-docs.component';
import { SmartSchedulersComponent } from './smart-schedulers/smart-schedulers.component';
import { UserAppliancesAdminComponent } from './user-appliances-admin/user-appliances-admin.component';

// MNC = Monitor and Control
@NgModule({
  declarations: [
    AutomateHardwaresComponent,
    MonitorHardwaresComponent,
    ControlActuatorsComponent,
    SmartReportsComponent,
    MySmartReportsComponent,
    UploadedServiceDocsComponent,
    SmartSchedulersComponent,
    UserAppliancesAdminComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    DataTablesModule,
    LayoutsModule,
    FragmentsModule,
    MncHardwaresRoutingModule,
  ]
})
export class MncHardwaresModule { }
