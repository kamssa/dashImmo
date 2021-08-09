import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FlashMaison} from '../../models/FlashMaison';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FlashMaisonService} from '../../service/flash-maison.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddFlashMaisonComponent} from '../add-flash-maison/add-flash-maison.component';
import {UpdateFlashMaisonComponent} from '../update-flash-maison/update-flash-maison.component';
import {DetailMaisonComponent} from '../../maison/detail-maison/detail-maison.component';
import {DetailFlashMaison} from '../../models/DetailFlashMaison';
import {DetailFlashMaisonComponent} from '../detail-flash-maison/detail-flash-maison.component';
import {VoirDetailMaisonComponent} from '../../maison/voir-detail-maison/voir-detail-maison.component';
import {VoirFlashMaisonComponent} from '../voir-flash-maison/voir-flash-maison.component';

@Component({
  selector: 'app-list-flash-maison',
  templateUrl: './list-flash-maison.component.html',
  styleUrls: ['./list-flash-maison.component.scss']
})
export class ListFlashMaisonComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'ville', 'image', 'detail', 'voirDetail', 'modifierImage',  'update', 'delete'];
  dataSource: MatTableDataSource<FlashMaison>;
  flashMaisons: FlashMaison[];
  flashMaison: FlashMaison;
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private flashMaisonService: FlashMaisonService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {
    this.flashMaisonService.getAllFlashMaison().subscribe(data => {
      this.flashMaisons = data.body;
      console.log('Voir ce qui se passe', data.body);
      if(data.body){
        this.flashMaisons.forEach(value => {
          let opp : FlashMaison = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<FlashMaison>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddFlashMaisonComponent, {
      width: '650px',
      data: this.flashMaison
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.flashMaison = result;
      this.router.navigate(['listFlasMaison']);

    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateFlashMaisonComponent,{
      data: {
        flashTerrain: id
      }
    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.flashMaisonService.supprimerFlashMaison(id).subscribe(data => {
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

  redirectToDetail(id: any) {
    console.log(id);
    this.dialog.open(DetailFlashMaisonComponent,{
      data: {
        flashMaison: id
      }
    });
  }

  redirectToVoirDetail(id: any) {
    console.log(id);
    this.dialog.open(VoirFlashMaisonComponent,{
      data: {
        flashMaison: id
      }
    });
  }
}
