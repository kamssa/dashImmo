import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Terrain} from '../../models/Terrain';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Admin} from '../../models/Admin';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TerrainService} from '../../service/terrain.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddTerrainsComponent} from '../add-terrains/add-terrains.component';
import {UpdateTerrainsComponent} from '../update-terrains/update-terrains.component';
import {ModalTerrainsComponent} from '../modal-terrains/modal-terrains.component';
import {DetailTerrainComponent} from '../detail-terrain/detail-terrain.component';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {DetailTerrain} from '../../models/DetailTerrain';
import {DetailImageService} from '../../service/detail-image.service';
import {UpdateDetailComponent} from '../update-detail/update-detail.component';

@Component({
  selector: 'app-voir-detail',
  templateUrl: './voir-detail.component.html',
  styleUrls: ['./voir-detail.component.scss']
})
export class VoirDetailComponent implements OnInit {

  displayedColumns: string[] = ['libelle', 'description', 'image1', 'image2', 'image3', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Terrain>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  detailTerrains: DetailTerrain[];
  detailTerrain: DetailTerrain;
  receptacle: any = [];
  url: any;
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private detailTerrainService: DetailTerrainService,
              private detailImageService: DetailImageService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {

    this.detailTerrainService.getAllDetailTerrain().subscribe(data => {
      this.detailTerrains = data.body;
      this.detailTerrains.forEach(detail => {
      this.detailImageService.getImageDetaiTerrain(detail.id)
        .subscribe(res => {
          console.log('Voir images', res.body);
        });
      });
      console.log('Voir ce qui se passe', data.body);
      if (data.body){
        this.detailTerrains.forEach(value => {
          let opp : DetailTerrain = value;
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
  redirectToDelete(id: any): void {
    console.log(id);
    if (this.ROLE_NAME === 'ROLE_ADMIN'){

      this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.detailTerrainService.delete(id).subscribe(data => {
            console.log(data);
            if (data.status === 0){
              this._snackBar.open('Succès de l\'opération!', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: 'top',

              });
            }else {
              this._snackBar.open('Ce terrain est déjà attribué à une personne !', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: 'top',

              });
            }

          });

        }
      });

    }else {
      console.log('vous netes pas authorisé');
    }

  }


  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateDetailComponent,{
      data: {
        detailTerrain: id
      }
    });
  }
}
