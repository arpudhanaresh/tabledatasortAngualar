import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataExportService } from 'src/DataExport.service';

import { AppRoutingModule } from './app-routing.module';
import { AppServiceService } from './app-service.service';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    
  ],
  providers: [DataExportService,AppServiceService],
  bootstrap: [AppComponent],

})
export class AppModule { }
