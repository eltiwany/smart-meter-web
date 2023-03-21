import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from './../../../../../../services/pages/users.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { ProviderClass } from 'src/app/common/components/modals/provider-class';
import { Component, OnInit } from '@angular/core';
import { UserBoardsService } from 'src/app/services/iot/user-boards.service';

@Component({
  selector: 'app-generate-test-data',
  templateUrl: './generate-test-data.component.html',
  styleUrls: ['./generate-test-data.component.css']
})
export class GenerateTestDataComponent implements OnInit {
  data: any;
  users:any[] = [];

  form = new FormGroup({
    'token': new FormControl(null, [GeneralValidators.required, GeneralValidators.isNot(null)]),
  });

  constructor(
    private boardsService: UserBoardsService,
    private modal: ModalsService,
    private usersService: UsersService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  get token() {
    return this.form.get('token');
  }

  getUsers() {
    return this.usersService.getUsersUnfiltered().then((response) => {
      if (!response.error) {
        this.users = response.data;
      }
    });
  }

  onSubmit = (): void => {
    const data = {
      token: this.token?.value
    };

    this.boardsService.generateTestData(data).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
