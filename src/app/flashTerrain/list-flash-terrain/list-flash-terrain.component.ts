import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Admin} from '../../models/Admin';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TerrainService} from '../../service/terrain.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../helper/notification.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddTerrainsComponent} from '../../terrains/add-terrains/add-terrains.component';
import {FlashTerrainService} from '../../service/flash-terrain.service';
import {AddFlashTerrainComponent} from '../add-flash-terrain/add-flash-terrain.component';

@Component({
  selector: 'app-list-flash-terrain',
  templateUrl: './list-flash-terrain.component.html',
  styleUrls: ['./list-flash-terrain.component.scss']
})
export class ListFlashTerrainComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'prix', 'superficie', 'image', 'ville', 'document', 'actions'];
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
  constructor(private flashTerrainService: FlashTerrainService,
              public dialog: MatDialog,
              private notificationService: NotificationService,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.flashTerrainService.getAllFlashTerrain().subscribe(list => {
      console.log('Voir la list des terrains', list.body);
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
    this.flashTerrainService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddFlashTerrainComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('verifier retour dialog open');
      this.flashTerrainService.flashTerrainCreer$
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
    this.flashTerrainService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddFlashTerrainComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.flashTerrainService.flashTerrainModif$
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
      this.flashTerrainService.supprimerFlashTerrain(row.id).subscribe(result => {
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

    }
  }


}
