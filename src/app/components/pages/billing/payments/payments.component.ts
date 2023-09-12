import { DeletePaymentsComponent } from './../../../../common/components/modals/pages/billing/payments/delete-payments/delete-payments.component';
import { ImportPaymentsComponent } from './../../../../common/components/modals/pages/billing/payments/import-payments/import-payments.component';
import { PaymentsService } from './../../../../services/pages/billing/payments.service';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  modalImportComponent: Type<any>;
  modalDeleteComponent: Type<any>;
  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = ['id', 'full_name', 'email', 'amount', 'transaction_id', 'transaction_date', 'description'];

  constructor(
    private paymentsService: PaymentsService
  ) {
    this.modalImportComponent = ImportPaymentsComponent;
    this.modalDeleteComponent = DeletePaymentsComponent;
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        Object.assign(dataTablesParameters, {...dataTablesParameters, allRecords: true})
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
        { data: 'full_name' },
        { data: 'email' },
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
