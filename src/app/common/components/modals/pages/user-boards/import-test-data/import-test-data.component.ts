import { GeneralValidators } from './../../../../../../validators/general.validators';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from './../../../../../../services/pages/users.service';
import { LoaderService } from './../../../../../services/extras/loader.service';
import { ModalsService } from './../../../../../services/layouts/modals.service';
import { ProviderClass } from 'src/app/common/components/modals/provider-class';
import { Component, OnInit } from '@angular/core';
import { UserBoardsService } from 'src/app/services/iot/user-boards.service';
import { SensorsService } from 'src/app/services/iot/sensors.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-test-data',
  templateUrl: './import-test-data.component.html',
  styleUrls: ['./import-test-data.component.css']
})
export class ImportTestDataComponent implements OnInit {

  data: any;
  users:any[] = [];
  userSensors:any[] = [];
  excelExportData:any[] = [];
  excelImportData:any[] = [];
  file: any;
  fileName: any;
  arrayBuffer: any;
  approvedToImport = false;

  importColumns = ['ID', 'NAME', 'VOLTAGE', 'VOLTAGE_COLUMN_ID', 'CURRENT', 'CURRENT_COLUMN_ID', 'RESISTANCE'];

  form = new FormGroup({
    'token': new FormControl(null, [GeneralValidators.required, GeneralValidators.isNot(null)]),
  });

  constructor(
    private boardsService: UserBoardsService,
    private modal: ModalsService,
    private usersService: UsersService,
    private loader: LoaderService,
    private userSensor: SensorsService
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

  getUserSensors() {
    this.userSensors = [];
    this.excelExportData = [];
    this.userSensor.getUserSensorsByToken(this.token?.value).then((response) => {
      if (!response.error) {
        this.userSensors = response.data;
        this.userSensors.forEach(sensor => {
          let column_names: any[] = JSON.parse(sensor.column_names);
          let voltageIndex = column_names.indexOf('V') ?? 0;
          let currentIndex = column_names.indexOf('A') ?? 0;
          let resistanceIndex = column_names.indexOf('R') ?? 0;
          let column_ids = JSON.parse(sensor.column_ids);
          // console.log(column_names);
          for (let index = 0; index < 50; index++) {
            this.excelExportData.push({
              ID: sensor.id,
              NAME: sensor.user_defined_name,
              // ['COLUMN_' + column_names[0]]: column_names[0],
              VOLTAGE_COLUMN_ID: column_ids[voltageIndex] ?? '-',
              VOLTAGE: 230,
              CURRENT_COLUMN_ID: column_ids[currentIndex] ?? '-',
              CURRENT: 5,
              RESISTANCE_COLUMN_ID: column_ids[resistanceIndex] ?? '-',
              RESISTANCE: 5,
              // DATE_TIME: (new Date())
            });
          }
        });

        // console.table(this.excelExportData);
      }
    });
  }

  downloadExcel() {
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(this.excelExportData));
    XLSX.writeFile(workbook, this?.token?.value + '_test_file.xlsx', {});
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

      // this.modal.open(content, 'xl');
    };
  }

  onSubmit = (): void => {

    // let chunkSent = 0;
    // const chunkSize = 20; // Choose an appropriate chunk size
    // const chunks: any[] = [];
    // for (let i = 0; i < this.excelImportData.length; i += chunkSize) {
    //   chunks.push(this.excelImportData.slice(i, i + chunkSize));
    // }

    // for (let index = 0; index < chunks.length; index++) {
      let data = {
        // testData: chunks[index]
        testData: this.excelImportData
      };

      try {
        this.boardsService.importTestData(data).then((response) => {
          // chunkSent+= 1;
          if (!response.error
            // && chunks.length == chunkSent
          ) {
            this.modal.close();
            this.loader.refresh();
          }
        });
      } catch (e) {
        console.log(`Error sending data: ${e}`);
      }

    // }

    // chunks.forEach(chunk => {


    // });
  }

}
