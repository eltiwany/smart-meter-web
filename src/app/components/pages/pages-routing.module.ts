import jwt_decode from 'jwt-decode';
import { SmartReportsComponent } from './mnc-hardwares/smart-reports/smart-reports.component';
import { MySmartReportsComponent } from './mnc-hardwares/my-smart-reports/my-smart-reports.component';
import { NotificationLogsComponent } from './notification-logs/notification-logs.component';
import { UserBoardsComponent } from './user-boards/user-boards.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './../../common/components/errors/not-found/not-found.component';
import { NoAccessComponent } from './../../common/components/errors/no-access/no-access.component';
import { RolesGuardService } from './../../services/guards/roles-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

const getDashboardComponent = (): Routes => {
  let path: any = [{'path': 'dashboard', 'component': MySmartReportsComponent, canActivate: [AuthGuardService]}];

  try {
    const jwt: any = jwt_decode(localStorage.getItem('token') + '');
    const permissions = jwt.permissions;

    permissions.forEach((permission: any) => {
      if (permission.page == 'All')
        path = [{'path': 'dashboard', 'component': SmartReportsComponent, canActivate: [AuthGuardService]}];
    });

  } catch(e) {
    // console.log('guest mode_');
    return path;
  }

  return path;
};

const routes: Routes = [
  // Stand-Alone Paths
  {'path': 'notification-logs', 'component': NotificationLogsComponent, canActivate: [AuthGuardService, RolesGuardService]},
  {'path': 'user-boards', 'component': UserBoardsComponent, canActivate: [AuthGuardService, RolesGuardService]},
  {'path': 'users', 'component': UsersComponent, canActivate: [AuthGuardService, RolesGuardService]},
  {'path': 'user-logs', 'component': UserLogsComponent, canActivate: [AuthGuardService, RolesGuardService]},

  // With Childrens
  {'path': 'config-hardwares', loadChildren: () => import('./config-hardwares/config-hardwares.module').then(m => m.ConfigHardwaresModule), canActivateChild: [RolesGuardService]},
  {'path': 'hardwares', loadChildren: () => import('./link-hardwares/link-hardwares.module').then(m => m.LinkHardwaresModule), canActivateChild: [RolesGuardService]},
  {'path': 'monitor-and-control', loadChildren: () => import('./mnc-hardwares/mnc-hardwares.module').then(m => m.MncHardwaresModule), canActivateChild: [RolesGuardService]},
  {'path': 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), canActivateChild: [RolesGuardService]},
  {'path': 'my-area', loadChildren: () => import('./my-area/my-area.module').then(m => m.MyAreaModule), canActivateChild: [RolesGuardService]},
  {'path': 'preferences', loadChildren: () => import('./system-preferences/system-preferences.module').then(m => m.SystemPreferencesModule), canActivateChild: [RolesGuardService]},
  {'path': 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule), canActivateChild: [RolesGuardService]},

  {'path': 'no-access', 'component': NoAccessComponent},
  {'path': '**', 'component': NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild([...getDashboardComponent(), ...routes])],
  exports: [RouterModule]
})
export class PagesRoutingModule {
  constructor() {}
}
