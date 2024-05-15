import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { EscalatedTicketsComponent } from './escalated-tickets/escalated-tickets.component';
import { DataTablesModule } from 'angular-datatables';
import { LayoutsModule } from 'src/app/common/components/layouts/layouts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewTicketComponent,
    AllTicketsComponent,
    MyTicketsComponent,
    OpenTicketsComponent,
    ClosedTicketsComponent,
    EscalatedTicketsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    DataTablesModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TicketsModule { }
