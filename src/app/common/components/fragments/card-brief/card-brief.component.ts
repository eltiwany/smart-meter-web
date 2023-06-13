import { GeneralService } from './../../../../services/general.service';
import { AppConfigService } from './../../../services/app-config.service';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-card-brief',
  templateUrl: './card-brief.component.html',
  styleUrls: ['./card-brief.component.css']
})
export class CardBriefComponent implements OnInit {
  @Input() cardName: any = "Card Name";
  @Input() allDataUrl: any = "/";
  @Input() cardNumberFormat: 'percent' |
                              'number' |
                              'currency' = 'number';
  @Input() cardNumber: number = 0;
  @Input() cardNumberSI: string = "";
  @Input() iconName: any = 'info-circle-fill';

  @Input() addedHeight = 1;

  constructor(
    public config: AppConfigService,
    public general: GeneralService
  ) { }

  ngOnInit(): void {
  }

}
