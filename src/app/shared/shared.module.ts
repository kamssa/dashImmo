import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from '../app-routing.module';
import {RouterModule} from '@angular/router';
import { AreaComponent } from './widgets/area/area.component';
import {HighchartsChartModule} from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { AlerteComponent } from './alerte/alerte.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    AlerteComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule,
    HighchartsChartModule

  ]
})
export class SharedModule { }
