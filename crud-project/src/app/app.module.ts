import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {httpInterceptorProviders} from "./_helpers/http.interceptor";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
