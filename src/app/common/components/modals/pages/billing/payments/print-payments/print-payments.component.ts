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

  constructor(
    public fn: FunctionsService,
    private dataIn: ProviderClass
  ) {}

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
    }
  }

}
