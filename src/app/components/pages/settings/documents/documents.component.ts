import { SettingsService } from 'src/app/services/pages/settings.service';
import { DeleteDocsComponent } from './../../../../common/components/modals/pages/settings/documents/delete-docs/delete-docs.component';
import { EditDocsComponent } from './../../../../common/components/modals/pages/settings/documents/edit-docs/edit-docs.component';
import { NewDocsComponent } from './../../../../common/components/modals/pages/settings/documents/new-docs/new-docs.component';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  modalComponent: Type<any>;
  modalEditComponent: Type<any>;
  modalDeleteComponent: Type<any>;
  dtOptions: DataTables.Settings = {};
  data: any[] = [];
  cols = ['id', 'name', 'description'];

  constructor(
    private settings: SettingsService
  ) {
    // Initialize modals for new, edit and delete
    this.modalComponent = NewDocsComponent;
    this.modalEditComponent = EditDocsComponent;
    this.modalDeleteComponent = DeleteDocsComponent;
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.settings.getDocuments(dataTablesParameters)
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
        { data: '', orderable: false}
      ],
      responsive: true
    };
  }

}
