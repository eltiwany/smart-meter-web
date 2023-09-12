import { FormGroup, FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/common/services/extras/loader.service';
import { ModalsService } from './../../../../../../services/layouts/modals.service';
import { PaymentsService } from './../../../../../../../services/pages/billing/payments.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-payments',
  templateUrl: './import-payments.component.html',
  styleUrls: ['./import-payments.component.css']
})
export class ImportPaymentsComponent implements OnInit {

  data: any;
  users:any[] = [];
  userSensors:any[] = [];
  excelExportData:any[] = [];
  excelImportData:any[] = [];
  file: any;
  fileName: any;
  arrayBuffer: any;
  approvedToImport = false;

  importColumns = ['EMAIL', 'TRANSACTION_ID', 'TRANSACTION_DATE', 'AMOUNT', 'DESCRIPTION'];

  form = new FormGroup({
  });

  constructor(
    private paymentsService: PaymentsService,
    private modal: ModalsService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    for (let index = 0; index < 2; index++) {
      this.excelExportData.push({
        EMAIL: 'mtwange@gmail.com',
        TRANSACTION_ID: 'CRDB/001/2031/' + (new Date().getTime()),
        TRANSACTION_DATE: new Date(),
        AMOUNT: Math.round(Math.random() * 10000),
        DESCRIPTION: 'Malipo ya Umeme',
      });
    }
  }

  downloadExcel() {
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(this.excelExportData));
    XLSX.writeFile(workbook, `payments_sample_file_${new Date().getTime()}.xlsx`, {});
  }

  /**
   * Detect file changed and open
   * modal as requested
   *
   * @param event fileChanged
   * @param content modalContent
   */
  onFileChange(event: any): void {
    this.excelImportData = [];
    this.file = event.target.files[0];
    // console.log(this.file);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    this.fileName = this.file.name;
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = [];
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {type: 'binary', cellDates: true});
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      // console.log(this.accountsFile);
      const arraylist: any[] = XLSX.utils.sheet_to_json(worksheet, {raw: true});
      // console.log(arraylist);

      for (const datum of arraylist) {
        // console.log(datum);
        // Check if all required columns exists on a file
        this.importColumns.forEach(column => {
          if (!datum[column]) {
            this.approvedToImport = false;
            return;
          }
          this.approvedToImport = true;
        });
        // If all columns exists add to file
        if (this.approvedToImport) {
          this.excelImportData.push(datum);
        }
      }

    };
  }

  onSubmit = (): void => {

      let data = {
        paymentData: this.excelImportData
      };

      this.paymentsService.importPayments(data).then((response) => {
        if (!response.error) {
          this.modal.close();
          this.loader.refresh();
        }
      });

  }

}
