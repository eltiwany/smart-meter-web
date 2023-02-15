import { ServiceDocumentsComponent } from './service-documents/service-documents.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'service-documents', component: ServiceDocumentsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAreaRoutingModule { }
