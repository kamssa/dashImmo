import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DetailMaison} from '../../models/DetailMaison';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Admin} from '../../models/Admin';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DetailMaisonService} from '../../service/detail-maison.service';
import {DetailImageService} from '../../service/detail-image.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Terrain} from '../../models/Terrain';
import {UpdateDetailMaisonComponent} from '../../maison/update-detail-maison/update-detail-maison.component';
import {DetailFlashMaison} from '../../models/DetailFlashMaison';
import {DetailFlashMaisonService} from '../../service/detail-flash-maison.service';

@Component({
  selector: 'app-voir-flash-maison',
  templateUrl: './voir-flash-maison.component.html',
  styleUrls: ['./voir-flash-maison.component.scss']
})
export class VoirFlashMaisonComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'prix', 'document', 'update', 'supprimer'];
  dataSource: MatTableDataSource<DetailFlashMaison>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  detailFlashMaisons: DetailFlashMaison[];
  receptacle: any = [];
  url: any;
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private detailFlashMaisonService: DetailFlashMaisonService,
              private detailImageService: DetailImageService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {

    this.detailFlashMaisonService.getAllDetailFlashMaison().subscribe(data => {
      this.detailFlashMaisons = data.body;
      this.detailFlashMaisons.forEach(detail => {
        this.detailImageService.getImageDetailFlashMaison(detail.id)
          .subscribe(res => {
            console.log('Voir images', res.body);
          });
      });
      console.log('Voir ce qui se passe', data.body);
      if (data.body){
        this.detailFlashMaisons.forEach(value => {
          let opp : DetailFlashMaison = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<DetailFlashMaison>(this.receptacle);
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
          this.detailFlashMaisonService.supprimerDetailFlashMaison(id).subscribe(data => {
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
    this.dialog.open(UpdateDetailMaisonComponent,{
      data: {
        detailFlashMaison: id
      }
    });
  }
}
