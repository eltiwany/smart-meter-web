import { GenerateTestDataComponent } from './../../../common/components/modals/pages/user-boards/generate-test-data/generate-test-data.component';
import { ViewUserBoardsComponent } from './../../../common/components/modals/pages/user-boards/view-user-boards/view-user-boards.component';
import { DeleteUserBoardsComponent } from './../../../common/components/modals/pages/user-boards/delete-user-boards/delete-user-boards.component';
import { NewUserBoardsComponent } from './../../../common/components/modals/pages/user-boards/new-user-boards/new-user-boards.component';
import { ResetUsersComponent } from './../../../common/components/modals/pages/users/reset-users/reset-users.component';
import { UsersService } from './../../../services/pages/users.service';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-user-boards',
  templateUrl: './user-boards.component.html',
  styleUrls: ['./user-boards.component.css']
})
export class UserBoardsComponent implements OnInit {
  modalComponent: Type<any>;
  modalViewComponent: Type<any>;
  modalGenerateComponent: Type<any>;
  modalDeleteComponent: Type<any>;

  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = ['id', 'email', 'role_name'];

  constructor(
    private users: UsersService,
  ) {
    // Initialize modals for new, edit and delete
    this.modalComponent = NewUserBoardsComponent;
    this.modalViewComponent = ViewUserBoardsComponent;
    this.modalGenerateComponent = GenerateTestDataComponent;
    this.modalDeleteComponent = DeleteUserBoardsComponent;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.users.getUsers(dataTablesParameters)
          .then(response => {
              this.data = response.data;
              callback({
                recordsTotal: response.recordsTotal,
                recordsFiltered: response.recordsFiltered,
                data: []
              });
            });
      },
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' },
        { data: 'role_name' },
        { data: '', orderable: false}
      ],
      responsive: true
    };
  }

}
