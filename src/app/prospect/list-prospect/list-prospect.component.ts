import { AddProspectComponent } from './../add-prospect/add-prospect.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Admin} from '../../models/Admin';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/helper/notification.service';
import { ProspectService } from 'src/app/service/prospect.service';
import { ModalProspectComponent } from '../modal-prospect/modal-prospect.component';
@Component({
  selector: 'app-list-prospect',
  templateUrl: './list-prospect.component.html',
  styleUrls: ['./list-prospect.component.scss']
})
export class ListProspectComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'email', 'telephone', 'fonction', 'preocupation', 'satisfait', 'actions'];
  listData: MatTableDataSource<any>;

  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  array: any;
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private prospectService: ProspectService,
              public dialog: MatDialog,
              private notificationService: NotificationService,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.prospectService.getAllProspect().subscribe(list => {
      console.log('Voir les prospects',list.body);
      if(list.status === 0){
        this.array = list.body.map(item => {
          return {
            id: item.id,
            ...item
          };
        });
      }else{
        console.log('aucune donnée');
      }

      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };

      });
    if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        this.admin = res.body;
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = this.ROLE_ADMIN.name;
        });
      });

    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    this.prospectService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddProspectComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      console.log('verifier retour dialog open');
      this.prospectService.prospectCreer$
      .subscribe(result => {
           console.log(result.body);
           this.array.unshift(result.body);
          this.array = this.array;
          this.listData = new MatTableDataSource(this.array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;


      });
     });
  }

  onEdit(row){
    this.prospectService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
     const dialogRef = this.dialog.open(AddProspectComponent, dialogConfig);

     dialogRef.afterClosed().subscribe(result => {
      console.log('verifier retour dialog update');
      this.prospectService.prospectModif$
      .subscribe(result => {
        const index: number = this.array.indexOf(row);
       if (index !== -1) {
          this.array[index] = result.body;
          this.listData = new MatTableDataSource(this.array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;

      }
      });
     });
  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer le prospect ?')){
      this.prospectService.deleteProspectById(row.id).subscribe(result => {
        console.log(result);
      });
      this.notificationService.warn('Suppression avec succès');

    }
    const index: number = this.array.indexOf(row);
    if (index !== -1) {
      this.array.splice(index, 1);
      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      console.log('Affiche Voici mon tableau', index)

  }
  }
  onModalProspect(id: any) {
    console.log(id);
    this.dialog.open(ModalProspectComponent,{
      data: {
        prospects: id
      }
    });
  }
}
