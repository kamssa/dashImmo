import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import {Produit} from '../../models/Produit';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ProduitService} from '../../service/produit.service';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddProduitAGeoComponent} from '../add-produit-ageo/add-produit-ageo.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '../../helper/notification.service';
import { AdminService } from '../../service/admin.service';
import { Admin } from '../../models/Admin';
import { TerrainVenduService } from '../../service/terrain-vendu.service';
import { Personne } from '../../models/Personne';
import {TerrainVendu} from '../../models/TerrainVendu';
import {CoordonnesComponent} from '../coordonnes/coordonnes.component';


@Component({
  selector: 'app-list-produit-ageo',
  templateUrl: './list-produit-ageo.component.html',
  styleUrls: ['./list-produit-ageo.component.scss']
})
export class ListProduitAGeoComponent implements OnInit {
 displayedColumns: string[] = ['nomComplet', 'email', 'telephone', 'numero','abonne', 'actions'];
  listData: MatTableDataSource<any>;
  personnes: Personne[];
  personne: Personne;
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
   terrainVendus: TerrainVendu[];
  constructor(private terrainVenduService: TerrainVenduService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.terrainVenduService.getAllTerrainVenduAbonneGeo().subscribe(list => {
      console.log(list.body);
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
   /*  this.terrainVenduService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddProduitAGeoComponent, dialogConfig);
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
     }); */
  }

  onEdit(row){
   /*  this.terrainVenduService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
     const dialogRef = this.dialog.open(AddProduitAGeoComponent, dialogConfig);

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
     }); */
  }

  onDelete(row){
    /* if(confirm('Voulez-vous vraiment supprimer le terrain ?')){
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

  } */
  }
  redirectToCord(row) {
    const dialogRef = this.dialog.open(CoordonnesComponent,{
      data: {
        terrainVendu: row.id
      }
    });
    /* dialogRef.afterClosed().subscribe(result => {
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
     }); */
  }
}
