import { PermissionsGuardService } from './../../../../services/guards/permissions-guard.service';
import { ModalsService } from './../../../services/layouts/modals.service';
import { Component, Injector, Input, OnInit, Type, OnChanges } from '@angular/core';
import { ProviderClass } from '../../modals/provider-class';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {
  dataInjected: any = {};
  // @ts-ignore
  componentEdit: Type<any>;
  @Input() headingView = "View Item";
  @Input() headingPrint = "Print";
  @Input() headingEdit = "Edit Item";
  @Input() headingDelete = "Delete Item";
  @Input() headingReset = "Reset Password";
  @Input() headingConfirm = "Confirm";

  // Optional Buttons
  @Input() resetPassword = false;
  @Input() confirmAction = false;
  @Input() editAction = true;
  @Input() viewAction = true;
  @Input() printAction = false;
  @Input() deleteAction = true;

  //
  @Input() iconName = 'bi bi-pencil-square';


  // Data for View & Edit
  @Input() data = [];
  // @ts-ignore
  @Input() modalEditContent: Type<any>;
  @Input() modalEditSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';
  // @ts-ignore
  @Input() modalDeleteContent: Type<any>;
  @Input() modalDeleteSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';
  // @ts-ignore
  @Input() modalViewContent: Type<any>;
  @Input() modalViewSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';
  // @ts-ignore
  @Input() modalPrintContent: Type<any>;
  @Input() modalPrintSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';

  // @ts-ignore
  @Input() modalResetContent: Type<any>;
  @Input() modalResetSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';

  // @ts-ignore
  @Input() modalConfirmContent: Type<any>;
  @Input() modalConfirmSize: 'md' | 'lg' | 'sm' | 'xl' = 'md';

  constructor(
    public modal: ModalsService,
    public permission: PermissionsGuardService,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    this.dataInjected = this.createInjector(this.data);
  }

  createInjector(dataObj: any) {
    // The ProviderClass is really just a stub, but is
    // neccessary for injection to work.
    return Injector.create(
      [{ provide: ProviderClass, useValue: dataObj }],
      this.injector
    );
  }

  printDiv(divName: string) {
    const printContents = (document?.getElementById(divName) as HTMLElement).innerHTML;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    // Extract print styles from the bundled styles
    const styles = Array.from(document.querySelectorAll('style'));
    styles.forEach((style) => {
      printWindow?.document.head.appendChild(style.cloneNode(true));
    });

    printWindow?.document.close();

    printWindow?.addEventListener('afterprint', () => {
      printWindow?.close();
      // Restore JavaScript functionalities here
    });

    printWindow?.print();

  }

}
