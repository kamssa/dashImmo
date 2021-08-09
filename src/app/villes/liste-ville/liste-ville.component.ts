import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Ville} from '../../models/combo/Ville';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {VilleService} from '../../service/ville.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddVilleComponent} from '../add-ville/add-ville.component';
import {UpdateVilleComponent} from '../update-ville/update-ville.component';
import {Demande} from '../../models/Demande';

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
  styleUrls: ['./liste-ville.component.scss']
})
export class ListeVilleComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'update', 'delete'];
  dataSource: MatTableDataSource<Ville>;
  villes: Ville[];
  ville: Ville;
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private villeService: VilleService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {
    this.villeService.getAllVille().subscribe(data => {
      this.villes = data.body;
      this.villes.forEach(value => {
        let opp : Ville = value;

        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Ville>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddVilleComponent, {
      width: '650px',
      data: this.ville
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ville = result;
      this.receptacle.unshift(this.ville);
      this.dataSource = this.receptacle;
     // this.dataSource = new MatTableDataSource<Categorie>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(UpdateVilleComponent,{
      data: {
        ville: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        // this.receptacle
        console.log(result);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Ville>(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.villeService.supprimerVille(id).subscribe(data => {
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
          this.villeService.getAllVille().subscribe(result => {
           if(result.body){
             this.dataSource = new MatTableDataSource<Ville>(result.body);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
           }
          });
        });

      }
    });


  }


}
