import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Maison} from '../../models/Maison';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddMaisonComponent} from '../add-maison/add-maison.component';
import {UpadateMaisonComponent} from '../upadate-maison/upadate-maison.component';
import {MaisonService} from '../../service/maison.service';
import {DetailMaisonComponent} from '../detail-maison/detail-maison.component';

import {ModifImageMAisonComponent} from '../modif-image-maison/modif-image-maison.component';
import {VoirDetailMaisonComponent} from '../voir-detail-maison/voir-detail-maison.component';

@Component({
  selector: 'app-liste-maison',
  templateUrl: './liste-maison.component.html',
  styleUrls: ['./liste-maison.component.scss']
})
export class ListeMaisonComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'ville', 'image', 'detail', 'voirDetail', 'modifierImage', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Maison>;
  maisons: Maison[];
  maison: Maison;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private maisonService: MaisonService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.maisonService.getAllMaison().subscribe(data => {
      this.maisons = data.body;
      console.log('Voir les maisons', data.body);
      if (data.body){
        this.maisons.forEach(value => {
          let opp : Maison = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Maison>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMaisonComponent, {
      width: '650px',
      data: this.maison
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.maison = result;
      if (this.maison.path){
        this.receptacle.unshift(this.maison);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Maison>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpadateMaisonComponent,{
      data: {
        maison: id
      }
    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.maisonService.supprimerMaison(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });

  }


  redirectToDetail(id: any) {
    console.log(id);
    this.dialog.open(DetailMaisonComponent,{
      data: {
        maison: id
      }
    });
  }

  redirectToModifImage(id: any) {
    console.log(id);
    this.dialog.open(ModifImageMAisonComponent,{
      data: {
        maison: id
      }
    });
  }

  redirectToVoirDetail(id: any) {
    console.log(id);
    this.dialog.open(VoirDetailMaisonComponent,{
      data: {
        maison: id
      }
    });
  }
}
