import { UserPaymentsComponent } from './user-payments/user-payments.component';
import { PaymentsComponent } from './payments/payments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {'path': 'payments', 'component': PaymentsComponent},
  {'path': 'user-payments', 'component': UserPaymentsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
