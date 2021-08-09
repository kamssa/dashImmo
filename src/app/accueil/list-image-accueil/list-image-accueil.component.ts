import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Maison} from '../../models/Maison';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MaisonService} from '../../service/maison.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddMaisonComponent} from '../../maison/add-maison/add-maison.component';
import {UpadateMaisonComponent} from '../../maison/upadate-maison/upadate-maison.component';
import {DetailMaisonComponent} from '../../maison/detail-maison/detail-maison.component';
import {ModifImageMAisonComponent} from '../../maison/modif-image-maison/modif-image-maison.component';
import {VoirDetailMaisonComponent} from '../../maison/voir-detail-maison/voir-detail-maison.component';
import {ImageAccueil} from '../../models/ImageAccueil';
import {ImageAccueilService} from '../../service/imageAccueil.service';
import {AddImageAccueilComponent} from '../add-image-accueil/add-image-accueil.component';

@Component({
  selector: 'app-list-image-accueil',
  templateUrl: './list-image-accueil.component.html',
  styleUrls: ['./list-image-accueil.component.scss']
})
export class ListImageAccueilComponent implements OnInit {

  displayedColumns: string[] = ['libelle', 'image',  'modifierImage', 'supprimer'];
  dataSource: MatTableDataSource<ImageAccueil>;
  imageAccueils: ImageAccueil[];
  imageAccueil: ImageAccueil;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private imageAccueilService: ImageAccueilService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.imageAccueilService.getAllImageAccueil().subscribe(data => {
      this.imageAccueils = data.body;
      console.log('Voir les images Accueil', data.body);
      if (data.body){
        this.imageAccueils.forEach(value => {
          let opp : ImageAccueil = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<ImageAccueil>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddImageAccueilComponent, {
      width: '650px',
      data: this.imageAccueil
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.imageAccueil = result;
      if (this.imageAccueil.path){
        this.receptacle.unshift(this.imageAccueil);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<ImageAccueil>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.imageAccueilService.supprimerImageAccueil(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });

  }

  redirectToModifImage(id: any) {

  }
}
