import { FragmentsModule } from './../../../common/components/fragments/fragments.module';
import { LayoutsModule } from './../../../common/components/layouts/layouts.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { UserPaymentsComponent } from './user-payments/user-payments.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    UserPaymentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    LayoutsModule,
    FragmentsModule,
    BillingRoutingModule
  ]
})
export class BillingModule { }
