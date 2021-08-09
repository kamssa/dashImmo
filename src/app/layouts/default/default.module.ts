import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {PostsComponent} from '../../modules/posts/posts.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TerrainsComponent} from '../../terrains/terrains.component';
import {RouterModule} from '@angular/router';
import {ErrorDialogComponent} from '../../service/shared/dialogs/error-dialog/error-dialog.component';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {MatConfirmDialogComponent} from '../../service/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import {AddDocComponent} from '../../documents/add-doc/add-doc.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateDocComponent} from '../../documents/update-doc/update-doc.component';
import {ListeDocComponent} from '../../documents/liste-doc/liste-doc.component';
import {ModalDocComponent} from '../../documents/modal-doc/modal-doc.component';




@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    MatConfirmDialogComponent,
    AddDocComponent,
    UpdateDocComponent,
    ListeDocComponent,
    ModalDocComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
