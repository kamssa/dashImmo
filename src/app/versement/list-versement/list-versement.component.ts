import { VersementService } from './../../service/versement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'src/app/models/Admin';
import { Router } from '@angular/router';
import { DialogConfirmService } from 'src/app/helper/dialog-confirm.service';
import { NotificationService } from 'src/app/helper/notification.service';
import { AdminService } from 'src/app/service/admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AddVersementComponent } from '../add-versement/add-versement.component';

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.scss']
})
export class ListVersementComponent implements OnInit {
  displayedColumns: string[] = ['date','montant', 'client','terrain','solde','reste', 'actions'];
  listData: MatTableDataSource<any>;
  documents: Document[];
  document: Document;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private versementService: VersementService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.versementService.getAllVersement().subscribe(list => {
      let array = list.body.map(item => {
        return {
          id: item.id,
          ...item
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };

      });
    /*if(localStorage.getItem('currentUser')) {
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

    }*/
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    //this.versementService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddVersementComponent, dialogConfig);
  }

  onEdit(row){
   // this.versementService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddVersementComponent, dialogConfig);
  }

  onDelete(id){
    if(confirm('Voulez-vous vraiment supprimer le document ?')){
      this.versementService.supprimerVersement(id).subscribe(result => {
        console.log(result);
      });
      this.notificationService.warn('!Suppression avec succès');
    }
  }

}
