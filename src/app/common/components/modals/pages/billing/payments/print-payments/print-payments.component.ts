import { AuthService } from './../../../../../../../services/auth/auth.service';
import { AppConfigService } from './../../../../../../services/app-config.service';
import { ProviderClass } from 'src/app/common/components/modals/provider-class';
import { FunctionsService } from './../../../../../../services/extras/functions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-payments',
  templateUrl: './print-payments.component.html',
  styleUrls: ['./print-payments.component.css']
})
export class PrintPaymentsComponent implements OnInit {

  data: any;
  meterNo: string = "";

  constructor(
    public fn: FunctionsService,
    private dataIn: ProviderClass,
    public app: AppConfigService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.meterNo = this.auth.getAuth()?.board?.token ?? '2JB31A21K43G';
    if (this.dataIn) {
      this.data = this.dataIn;
    }
  }

}
