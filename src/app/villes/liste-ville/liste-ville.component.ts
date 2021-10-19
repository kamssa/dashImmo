import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Ville} from '../../models/combo/Ville';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {VilleService} from '../../service/ville.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddVilleComponent} from '../add-ville/add-ville.component';
import {Document} from '../../models/Document';
import {Admin} from '../../models/Admin';
import {DocumentService} from '../../service/document.service';
import {NotificationService} from '../../helper/notification.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddDocComponent} from '../../documents/add-doc/add-doc.component';

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
  styleUrls: ['./liste-ville.component.scss']
})
export class ListeVilleComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'actions'];
  listData: MatTableDataSource<any>;
  villes: Ville[];
  ville: Ville;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private villeService: VilleService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.villeService.getAllVille().subscribe(list => {
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
    this.villeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddVilleComponent, dialogConfig);
  }

  onEdit(row){
    this.villeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddVilleComponent, dialogConfig);
  }

  onDelete(id){
    if(confirm('Voulez-vous vraiment supprimer la ville ?')){
      this.villeService.supprimerVille(id).subscribe(result => {
      });
      this.notificationService.warn('Suppression avec succès');
    }
  }
}
