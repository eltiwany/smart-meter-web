import { UsersService } from './../../../../../../services/pages/users.service';
import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { SettingsService } from './../../../../../../services/pages/settings.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.css']
})
export class SendNotificationsComponent implements OnInit {

  constructor(
    private modal: ModalsService,
    private settings: UsersService,
    private loader: LoaderService
  ) { }

  form = new FormGroup({
    'message': new FormControl('', [GeneralValidators.required]),
  });

  get message() {
    return this.form.get('message');
  }


  ngOnInit(): void {
  }

  onSubmit = (): void => {
    const data = {
      message: this.message?.value,
    };
    this.settings.sendNotification(data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }
}
