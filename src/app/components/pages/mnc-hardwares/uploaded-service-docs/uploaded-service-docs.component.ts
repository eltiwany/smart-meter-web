import { ViewServiceDocsComponent } from './../../../../common/components/modals/pages/my-area/view-service-docs/view-service-docs.component';
import { ServiceDocumentsService } from './../../../../services/pages/my-area/service-documents.service';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-uploaded-service-docs',
  templateUrl: './uploaded-service-docs.component.html',
  styleUrls: ['./uploaded-service-docs.component.css']
})
export class UploadedServiceDocsComponent implements OnInit {

  modalViewComponent: Type<any>;
  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = ['id', 'name'];

  constructor(
    private docsService: ServiceDocumentsService
  ) {
    this.modalViewComponent = ViewServiceDocsComponent;
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        Object.assign(dataTablesParameters, {...dataTablesParameters, allDocs: true})
        this.docsService.getDocuments(dataTablesParameters)
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
        { data: 'description' },
        { data: 'file_url' },
        { data: 'full_name' },
        { data: 'phone_number' },
        { data: 'created_at' },
        { data: '', orderable: false}
      ],
      responsive: true
    };
  }

}
