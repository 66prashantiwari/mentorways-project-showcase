import { Routerguard } from './shared/dataService/MainModuleGuardService';
import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTPInterceptor } from './shared/dataService/httpIntercepter';
import { Loginguard } from './shared/dataService/AuthGuardService';
import { AccordionModule } from 'primeng/accordion';//accordion and accordion tab

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    ToastModule,
  ],
  providers: [
    // HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true },
    MessageService,
    Loginguard,
    Routerguard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
