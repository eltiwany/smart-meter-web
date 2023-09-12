import { PrintPaymentsComponent } from './../../../../common/components/modals/pages/billing/payments/print-payments/print-payments.component';
import { PaymentsService } from './../../../../services/pages/billing/payments.service';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.css']
})
export class UserPaymentsComponent implements OnInit {

  modalPrintComponent: Type<any>;
  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = ['id', 'name', 'email', 'amount', 'transaction_id', 'transaction_date', 'description'];

  constructor(
    private paymentsService: PaymentsService
  ) {
    this.modalPrintComponent = PrintPaymentsComponent;
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.paymentsService.getPayments(dataTablesParameters)
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
        { data: 'amount' },
        { data: 'transaction_id' },
        { data: 'transaction_date' },
        { data: 'description' },
        { data: '', orderable: false}
      ],
      responsive: true
    };
  }

}
