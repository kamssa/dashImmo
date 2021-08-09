import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Produit} from '../../models/Produit';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ProduitService} from '../../service/produit.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddProduitAGeoComponent} from '../add-produit-ageo/add-produit-ageo.component';

@Component({
  selector: 'app-list-produit-ageo',
  templateUrl: './list-produit-ageo.component.html',
  styleUrls: ['./list-produit-ageo.component.scss']
})
export class ListProduitAGeoComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'image', 'categorie', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Produit>;
  produits: Produit[];
  produit: Produit;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private produitService: ProduitService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.produitService.getAbonneGeo().subscribe(data => {
      this.produits = data.body;
      console.log('Voir ce qui se passe', data.body);
      if (data.body){
        this.produits.forEach(value => {
          let opp : Produit = value;

          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Produit>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProduitAGeoComponent, {
      width: '650px',
      data: this.produit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.produit = result;
      if (this.produit.path){
        this.receptacle.unshift(this.produit);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Produit>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  /*redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateP,{
      data: {
        produit: id
      }
    });
  }*/
  redirectToDelete(id: any) {
    /*this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.produitService.supprimerTerrain(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });
*/
  }
}
