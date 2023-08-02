import { FragmentsModule } from './components/fragments/fragments.module';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { NoAccessComponent } from './components/errors/no-access/no-access.component';
import { DataTablesModule } from 'angular-datatables';
import { GoogleMapsModule } from '@angular/google-maps'
import {ConnectionServiceModule} from 'ng-connection-service';



@NgModule({
  declarations: [
    NotFoundComponent,
    NoAccessComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NotFoundComponent,
    NoAccessComponent,
    DataTablesModule,
    GoogleMapsModule,
    ConnectionServiceModule
  ],
  providers: [
  ]
})
export class MyCommonModule { }
