import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import { Personne } from 'src/app/models/Personne';
import { DVersementService } from '../../service/dversement.service';
import { UpdateVersementComponent } from '../update-versement/update-versement.component';

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.scss']
})
export class ListVersementComponent implements OnInit {
  displayedColumns: string[] = ['date','montant','actions'];
  listData: MatTableDataSource<any>;
  documents: Document[];
  document: Document;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  array: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private dversementService: DVersementService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService,
              public dialogRef: MatDialogRef<ListVersementComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Personne) {
  }
  ngOnInit(): void {
    this.dversementService.getDVersementByIdClient(this.data['client']).subscribe(list => {
       this.array = list.body.map(item => {
        return {
          id: item.id,
          ...item
        };
      });
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
          console.log('voir val', val);
          this.ROLE_ADMIN = val;
         if(this.ROLE_ADMIN.name ==="ROLE_ADMIN")
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddVersementComponent, dialogConfig);
  }

  onEdit(row){
    console.log('Voir id du row', row);
    const dialogRef = this.dialog.open(UpdateVersementComponent, {
      width: '650px',
      data: {
        detailVersement: row.id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log('Affiche valeur retour du dialog', res);
      this.dversementService.dVerementModif$
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
    if(confirm('Voulez-vous vraiment supprimer le versement ?')){
      this.dversementService.supprimerDVersement(row.id).subscribe(result => {
        console.log(row);

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
  onClose() {
    this.dialogRef.close();
      }
}
