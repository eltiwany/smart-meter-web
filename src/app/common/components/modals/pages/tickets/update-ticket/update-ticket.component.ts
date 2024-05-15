import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/common/services/extras/functions.service';
import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { ModalsService } from 'src/app/common/services/layouts/modals.service';
import { PreferencesService } from 'src/app/common/services/preferences.service';
import { TicketsService } from 'src/app/services/tickets/pages/tickets.service';
import { GeneralValidators } from 'src/app/validators/general.validators';
import { ProviderClass } from '../../../provider-class';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

  statuses: any[] = [];
  selectors = {
    status: '-- Select Status --'
  }
  data: any;

  constructor(
    private modal: ModalsService,
    private tickets: TicketsService,
    private loader: LoaderService,
    public fn: FunctionsService,
    private router: Router,
    private dataIn: ProviderClass,
    private preferences: PreferencesService
  ) {}

  form = new FormGroup({
    'remark': new FormControl('', [GeneralValidators.required]),
    'status': new FormControl(this.selectors.status, [GeneralValidators.required, GeneralValidators.isNot(this.selectors.status) ]),
  });

  get remark() {
    return this.form.get('remark');
  }

  get status() {
    return this.form.get('status');
  }

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.getStatuses();
    }
  }

  getStatuses() {
    if (this.data.status == 'Closed')
      this.statuses = this.fn.getTicketStatuses().filter((status) => status == 'Escalated');
    else
      this.statuses = this.fn.getTicketStatuses().filter((status) => status != 'Created' && status != 'Escalated');
  }

  onSubmit = (): void => {
    // this.router.navigateByUrl('/tickets/my-tickets');

    const data = {
      remark: this.remark?.value,
      status: this.status?.value,
    };

    this.tickets.updateTicket(this.data.id, data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
