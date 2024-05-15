import { MyCommonModule } from 'src/app/common/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUsersComponent } from './pages/users/view-users/view-users.component';
import { NewUsersComponent } from './pages/users/new-users/new-users.component';
import { DeleteUsersComponent } from './pages/users/delete-users/delete-users.component';
import { EditUsersComponent } from './pages/users/edit-users/edit-users.component';
import { ResetUsersComponent } from './pages/users/reset-users/reset-users.component';
import { ClearLogsComponent } from './pages/user-logs/clear-logs/clear-logs.component';
import { NewAutomationsComponent } from './pages/automations/new-automations/new-automations.component';
import { EditAutomationsComponent } from './pages/automations/edit-automations/edit-automations.component';
import { DeleteAutomationsComponent } from './pages/automations/delete-automations/delete-automations.component';
import { ViewAutomationsComponent } from './pages/automations/view-automations/view-automations.component';
import { NewUserBoardsComponent } from './pages/user-boards/new-user-boards/new-user-boards.component';
import { DeleteUserBoardsComponent } from './pages/user-boards/delete-user-boards/delete-user-boards.component';
import { ViewUserBoardsComponent } from './pages/user-boards/view-user-boards/view-user-boards.component';
import { NewServiceDocsComponent } from './pages/my-area/new-service-docs/new-service-docs.component';
import { DeleteServiceDocsComponent } from './pages/my-area/delete-service-docs/delete-service-docs.component';
import { EditServiceDocsComponent } from './pages/my-area/edit-service-docs/edit-service-docs.component';
import { ViewServiceDocsComponent } from './pages/my-area/view-service-docs/view-service-docs.component';
import { SendNotificationsComponent } from './pages/users/send-notifications/send-notifications.component';
import { GenerateTestDataComponent } from './pages/user-boards/generate-test-data/generate-test-data.component';
import { NewSchedulersComponent } from './pages/schedulers/new-schedulers/new-schedulers.component';
import { ViewSchedulersComponent } from './pages/schedulers/view-schedulers/view-schedulers.component';
import { EditSchedulersComponent } from './pages/schedulers/edit-schedulers/edit-schedulers.component';
import { DeleteSchedulersComponent } from './pages/schedulers/delete-schedulers/delete-schedulers.component';
import { ImportTestDataComponent } from './pages/user-boards/import-test-data/import-test-data.component';
import { PrintPaymentsComponent } from './pages/billing/payments/print-payments/print-payments.component';
import { DeletePaymentsComponent } from './pages/billing/payments/delete-payments/delete-payments.component';
import { ImportPaymentsComponent } from './pages/billing/payments/import-payments/import-payments.component';
import { ViewTicketComponent } from './pages/tickets/view-ticket/view-ticket.component';
import { UpdateTicketComponent } from './pages/tickets/update-ticket/update-ticket.component';
import { DeleteTicketComponent } from './pages/tickets/delete-ticket/delete-ticket.component';

@NgModule({
  declarations: [
    ViewUsersComponent,
    NewUsersComponent,
    DeleteUsersComponent,
    EditUsersComponent,
    ResetUsersComponent,
    ClearLogsComponent,
    NewAutomationsComponent,
    EditAutomationsComponent,
    DeleteAutomationsComponent,
    ViewAutomationsComponent,
    NewUserBoardsComponent,
    DeleteUserBoardsComponent,
    ViewUserBoardsComponent,
    NewServiceDocsComponent,
    DeleteServiceDocsComponent,
    EditServiceDocsComponent,
    ViewServiceDocsComponent,
    SendNotificationsComponent,
    GenerateTestDataComponent,
    NewSchedulersComponent,
    ViewSchedulersComponent,
    EditSchedulersComponent,
    DeleteSchedulersComponent,
    ImportTestDataComponent,
    PrintPaymentsComponent,
    DeletePaymentsComponent,
    ImportPaymentsComponent,
    ViewTicketComponent,
    UpdateTicketComponent,
    DeleteTicketComponent,
  ],
  imports: [
    CommonModule,
    MyCommonModule
  ]
})
export class ModalsModule { }
