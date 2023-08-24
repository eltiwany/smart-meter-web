import { UserAppliancesAdminComponent } from './user-appliances-admin/user-appliances-admin.component';
import { SmartSchedulersComponent } from './smart-schedulers/smart-schedulers.component';
import { UploadedServiceDocsComponent } from './uploaded-service-docs/uploaded-service-docs.component';
import { MySmartReportsComponent } from './my-smart-reports/my-smart-reports.component';
import { SmartReportsComponent } from './smart-reports/smart-reports.component';
import { ControlActuatorsComponent } from './control-actuators/control-actuators.component';
import { MonitorHardwaresComponent } from './monitor-hardwares/monitor-hardwares.component';
import { AutomateHardwaresComponent } from './automate-hardwares/automate-hardwares.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'automate-hardwares', component: AutomateHardwaresComponent},
  {path: 'smart-schedulers', component: SmartSchedulersComponent},
  {path: 'monitor-hardwares', component: MonitorHardwaresComponent},
  {path: 'smart-reports', component: SmartReportsComponent},
  {path: 'my-smart-reports', component: MySmartReportsComponent},
  {path: 'consumer-appliances', component: UserAppliancesAdminComponent},
  {path: 'control-actuators', component: ControlActuatorsComponent},
  {path: 'uploaded-service-docs', component: UploadedServiceDocsComponent},
];

// MNC = Monitor and Control
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MncHardwaresRoutingModule { }
