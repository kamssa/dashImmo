import {Component, OnInit, ViewChild} from '@angular/core';
import {AddProduitComponent} from '../add-produit/add-produit.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TerrainVenduService} from '../../service/terrain-vendu.service';
import {TerrainVendu} from '../../models/TerrainVendu';
import { NotificationService } from 'src/app/helper/notification.service';
import { Admin } from '../../models/Admin';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/service/admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-list-produit-vendu',
  templateUrl: './list-produit-vendu.component.html',
  styleUrls: ['./list-produit-vendu.component.scss']
})
export class ListProduitVenduComponent implements OnInit {
  displayedColumns: string[] = ['numero','libelle' ,'nomComplet', 'email', 'telephone', 'actions'];
  terrainVendus: TerrainVendu[];
  terrainVendu: TerrainVendu;
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
  constructor(
              private terrainVenduService: TerrainVenduService,
              private notificationService: NotificationService,
              public dialog: MatDialog, private router: Router,
              private adminService: AdminService,
              private helper: JwtHelperService
              ) {
  }
  ngOnInit(): void {
    this.terrainVenduService.getAllTerrainVendu()
    .subscribe(list => {
      console.log(list.body);
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
    this.terrainVenduService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddProduitComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      console.log('verifier retour dialog open');
      this.terrainVenduService.terrainVenduCreer$
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
    this.terrainVenduService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
     const dialogRef = this.dialog.open(AddProduitComponent, dialogConfig);

     dialogRef.afterClosed().subscribe(result => {
      console.log('verifier retour dialog update');
      this.terrainVenduService.terrainVenduModif$
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
    if(confirm('Voulez-vous vraiment supprimer le client ?')){
      this.terrainVenduService.supprimerTerrainVendu(row.id).subscribe(result => {
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
  /* redirectToCord(row) {
    const dialogRef = this.dialog.open(UpdateCoordComponent,{
      data: {
        terrainVendu: row.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('verifier retour dialog update');
      this.terrainVenduService.terrainVenduModif$
      .subscribe(result => {
        const index: number = this.terrainVendus.indexOf(row);
       if (index !== -1) {
          this.terrainVendus[index] = result.body;
          this.listData = new MatTableDataSource(this.terrainVendus);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;

      }
      });
     });
  } */
}
