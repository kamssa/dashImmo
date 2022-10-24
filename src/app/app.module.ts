import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ErrorInterceptor} from './helper/error.interceptor';
import {APP_DATE_FORMATS, AppDateAdapter} from './helper/format-datepicker';
import {RxStompService} from '@stomp/ng2-stompjs';
import {DefaultModule} from './layouts/default/default.module';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AddFlashTerrainComponent } from './flashTerrain/add-flash-terrain/add-flash-terrain.component';
import { ListFlashTerrainComponent } from './flashTerrain/list-flash-terrain/list-flash-terrain.component';
import {MaterialModule} from './material/material.module';


registerLocaleData(localeFr);



@NgModule({
  declarations: [
    AppComponent,
    AddFlashTerrainComponent,
    ListFlashTerrainComponent,



],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    DefaultModule,
    MaterialModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    RxStompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
