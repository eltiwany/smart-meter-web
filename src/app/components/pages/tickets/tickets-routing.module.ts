import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { EscalatedTicketsComponent } from './escalated-tickets/escalated-tickets.component';

const routes: Routes = [
  { path: 'new-ticket', component: NewTicketComponent },
  { path: 'all-tickets', component: AllTicketsComponent },
  { path: 'my-tickets', component: MyTicketsComponent },
  { path: 'open-tickets', component: OpenTicketsComponent },
  { path: 'closed-tickets', component: ClosedTicketsComponent },
  { path: 'escalated-tickets', component: EscalatedTicketsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
