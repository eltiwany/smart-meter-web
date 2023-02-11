import { MySmartReportsComponent } from './my-smart-reports/my-smart-reports.component';
import { SmartReportsComponent } from './smart-reports/smart-reports.component';
import { ControlActuatorsComponent } from './control-actuators/control-actuators.component';
import { MonitorHardwaresComponent } from './monitor-hardwares/monitor-hardwares.component';
import { AutomateHardwaresComponent } from './automate-hardwares/automate-hardwares.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'automate-hardwares', component: AutomateHardwaresComponent},
  {path: 'monitor-hardwares', component: MonitorHardwaresComponent},
  {path: 'smart-reports', component: SmartReportsComponent},
  {path: 'my-smart-reports', component: MySmartReportsComponent},
  {path: 'control-actuators', component: ControlActuatorsComponent},
];

// MNC = Monitor and Control
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MncHardwaresRoutingModule { }
