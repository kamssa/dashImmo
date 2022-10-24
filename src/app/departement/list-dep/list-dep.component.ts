import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddDepComponent} from '../add-dep/add-dep.component';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DepartementService} from '../../service/dep.service';
import {AdminService} from '../../service/admin.service';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {NotificationService} from '../../helper/notification.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Admin} from '../../models/Admin';
import {Departement} from '../../models/Departement';
import {EmployeService} from '../../service/employe.service';
import {Employe} from '../../models/Employe';



@Component({
  selector: 'app-list-dep',
  templateUrl: './list-dep.component.html',
  styleUrls: ['./list-dep.component.scss']
})
export class ListDepComponent implements OnInit {
displayedColumns: string[] = ['libelle', 'description', 'actions'];
  listData: MatTableDataSource<any>;
  departements: Departement[];
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  employes: Employe[];
  constructor(private departementService: DepartementService,
              private employeService: EmployeService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.departementService.getAllDepartement().subscribe(list => {
      let array = list.body.map(item => {
        return {
          id: item.id,
          ...item
        };
      });
      console.log(array);
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
    this.departementService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }

  onEdit(row){
    this.departementService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }

  onDelete(id){
    this.employeService.getEmployeByIdDepartement(id)
    .subscribe(data => {
      this.employes = data.body;
      console.log('taille de employe',this.employes.length);
    if(this.employes.length===0){
    if(confirm('Voulez-vous vraiment supprimer le departement ?')){
      this.departementService.supprimerDepartement(id).subscribe(result => {
        console.log(result);
      });
      this.notificationService.warn('Suppression avec succès');
    }
    }else{
       this.notificationService.warn('Supprimer d\'abord les employés');
    }
  
    })
    
  }
}
