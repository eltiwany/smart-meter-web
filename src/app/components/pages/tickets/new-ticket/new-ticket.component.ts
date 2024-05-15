import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/common/services/extras/functions.service';
import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { ModalsService } from 'src/app/common/services/layouts/modals.service';
import { PreferencesService } from 'src/app/common/services/preferences.service';
import { TicketsService } from 'src/app/services/tickets/pages/tickets.service';
import { GeneralValidators } from 'src/app/validators/general.validators';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  districts: any[] = [];
  regions: any[] = [];
  cities: any[] = [];

  statuses: any[] = [];
  selectors = {
    status: '-- Select Status --'
  }

  constructor(
    private modal: ModalsService,
    private tickets: TicketsService,
    private loader: LoaderService,
    public fn: FunctionsService,
    private router: Router,
    private preferences: PreferencesService
  ) {}

  form = new FormGroup({
    'description': new FormControl('', [GeneralValidators.required]),
    'status': new FormControl({ value: 'Created', disabled: true }, [GeneralValidators.required, GeneralValidators.isNot(this.selectors.status) ]),
  });

  get description() {
    return this.form.get('description');
  }

  get status() {
    return this.form.get('status');
  }

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    this.statuses = this.fn.getTicketStatuses();
  }

  onSubmit = (): void => {
    // this.router.navigateByUrl('/tickets/my-tickets');

    const data = {
      description: this.description?.value,
      status: this.status?.value,
    };
    // console.log(data);

    this.tickets.newTicket(data).then((response) => {
      if (!response.error) {
        this.router.navigateByUrl('/tickets/my-tickets');
      }
    });
  }

}
