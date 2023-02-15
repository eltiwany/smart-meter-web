import { DeleteServiceDocsComponent } from './../../../../common/components/modals/pages/my-area/delete-service-docs/delete-service-docs.component';
import { EditServiceDocsComponent } from './../../../../common/components/modals/pages/my-area/edit-service-docs/edit-service-docs.component';
import { ViewServiceDocsComponent } from './../../../../common/components/modals/pages/my-area/view-service-docs/view-service-docs.component';
import { NewServiceDocsComponent } from './../../../../common/components/modals/pages/my-area/new-service-docs/new-service-docs.component';
import { ServiceDocumentsService } from './../../../../services/pages/my-area/service-documents.service';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-service-documents',
  templateUrl: './service-documents.component.html',
  styleUrls: ['./service-documents.component.css']
})
export class ServiceDocumentsComponent implements OnInit {

  modalComponent: Type<any>;
  modalViewComponent: Type<any>;
  modalEditComponent: Type<any>;
  modalDeleteComponent: Type<any>;
  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = ['id', 'name'];

  constructor(
    private docsService: ServiceDocumentsService
  ) {
    // Initialize modals for new, edit and delete
    this.modalComponent = NewServiceDocsComponent;
    this.modalViewComponent = ViewServiceDocsComponent;
    this.modalEditComponent = EditServiceDocsComponent;
    this.modalDeleteComponent = DeleteServiceDocsComponent;
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
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
        { data: '', orderable: false}
      ],
      responsive: true
    };
  }

}
