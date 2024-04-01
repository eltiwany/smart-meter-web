import { CommonAuthService } from './../../../services/common-auth.service';
import { ToggleService } from './../../../services/extras/toggle.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { AppConfigService } from './../../../services/app-config.service';
import { Component, OnInit, OnChanges, SimpleChanges, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NewBoardsComponent } from '../../modals/pages/link-hardwares/boards/new-boards/new-boards.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],

})
export class TopNavComponent implements OnInit {

  boardName: string = "NodeMCU ESP8266";
  isBoardConnected: boolean = false;
  modalConnectBoardComponent: Type<any>;

  constructor(
    public config: AppConfigService,
    public toggle: ToggleService,
    public auth: AuthService,
    public commonAuth: CommonAuthService
  ) {
    this.modalConnectBoardComponent = NewBoardsComponent;
  }

  ngOnInit(): void {

  }

}
