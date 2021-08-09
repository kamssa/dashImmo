import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Terrain} from '../../models/Terrain';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TerrainService} from '../../service/terrain.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddTerrainsComponent} from '../add-terrains/add-terrains.component';
import {UpdateTerrainsComponent} from '../update-terrains/update-terrains.component';
import {Admin} from '../../models/Admin';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ModalTerrainsComponent} from '../modal-terrains/modal-terrains.component';
import {DetailTerrainComponent} from '../detail-terrain/detail-terrain.component';
import {VoirDetailComponent} from '../voir-detail/voir-detail.component';
import {ModifImageComponent} from '../modif-image/modif-image.component';

@Component({
  selector: 'app-liste-terrains',
  templateUrl: './liste-terrains.component.html',
  styleUrls: ['./liste-terrains.component.scss']
})
export class ListeTerrainsComponent implements OnInit {

  displayedColumns: string[] = ['libelle', 'description', 'ville', 'image', 'detail', 'voirDetail', 'modifierImage', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Terrain>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  terrains: Terrain[];
  terrain: Terrain;
  receptacle: any = [];
  url: any;
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private terrainService: TerrainService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {

    this.terrainService.getAllTerrain().subscribe(data => {
      this.terrains = data.body;
      console.log('Voir ce qui se passe', data.body);
      if (data.body){
        this.terrains.forEach(value => {
          let opp : Terrain = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Terrain>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        this.admin = res.body;
        this.roles = res.body.roles;
        console.log(this.roles);
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = this.ROLE_ADMIN.name;
          console.log(this.ROLE_ADMIN);
        });
      });

    }
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTerrainsComponent, {
      width: '650px',
      data: this.terrain
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.terrain = result;
      if (this.terrain.path){
        this.receptacle.unshift(this.terrain);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Terrain>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  redirectToUpdate(id: any): void {
    console.log(id);
    this.dialog.open(UpdateTerrainsComponent,{
      data: {
        terrain: id
      }
    });
  }
  redirectToDelete(id: any): void {
    if (this.ROLE_NAME === 'ROLE_ADMIN'){

      this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.terrainService.supprimerTerrain(id).subscribe(data => {
            this._snackBar.open('Succès de l\'opération!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
          });

        }
      });

    }else {
      console.log('vous netes pas authorisé');
    }

  }

  onModalTerrain(id: any) {
    console.log(id);
    this.dialog.open(ModalTerrainsComponent,{
      data: {
        terrain: id
      }
    });
  }
  redirectToDetail(id: any) {
    console.log(id);
    this.dialog.open(DetailTerrainComponent,{
      data: {
        terrain: id
      }
    });
  }

  redirectToVoirDetail(id: any) {
    console.log(id);
    this.dialog.open(VoirDetailComponent,{
      data: {
        terrain: id
      }
    });
  }

  redirectToModifImage(id: any) {
    console.log(id);
    this.dialog.open(ModifImageComponent,{
      data: {
        terrain: id
      }
    });
  }
}
