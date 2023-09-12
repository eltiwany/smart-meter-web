import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ProviderClass } from 'src/app/common/components/modals/provider-class';
import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { ModalsService } from './../../../../../../services/layouts/modals.service';
import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/pages/billing/payments.service';

@Component({
  selector: 'app-delete-payments',
  templateUrl: './delete-payments.component.html',
  styleUrls: ['./delete-payments.component.css']
})
export class DeletePaymentsComponent implements OnInit {

  form = new FormGroup({
    paymentId: new FormControl('')
  });

  data: any
  constructor(
    private modal: ModalsService,
    private paymentService: PaymentsService,
    private loader: LoaderService,
    public dataIn: ProviderClass
  ) { }

  ngOnInit(): void {
    if (this.dataIn) {
      this.data = this.dataIn;
      this.form.setControl('paymentId', new FormControl(this.data.id));
    }
  }

  get paymentId() {
    return this.form.get('paymentId');
  }

  onSubmit() {
    this.paymentService.deletePayment(this.paymentId?.value).then((response) => {
      if (!response.error) {
        this.modal.close();
        this.loader.refresh();
      }
    });
  }

}
