import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Demande} from '../../models/Demande';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DemandeService} from '../../service/demande.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {DetailTerrain} from '../../models/DetailTerrain';
import {AddVilleComponent} from '../../villes/add-ville/add-ville.component';
import {DemandeSelectComponent} from '../demande-select/demande-select.component';
import {UpdateTerrainsComponent} from '../../terrains/update-terrains/update-terrains.component';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.scss']
})
export class ListeDemandeComponent implements OnInit {
  displayedColumns: string[] = ['date', 'nomComplet', 'email', 'telephone', 'selection', 'marquer'];
  dataSource: MatTableDataSource<Demande>;
  demandes: Demande[];
  demande: Demande;
  detailTerrain: DetailTerrain;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private demandeService: DemandeService,
              private detailTerrainService: DetailTerrainService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.demandeService.nbreDemandeNonLu().subscribe(data => {
      this.demandes = data.body;
      console.log('Voir les maisons', data.body);
      if (data.body){
        this.demandes.forEach(value => {
          let opp : Demande = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Demande>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  redirectToUpdate(id: number) {
    console.log(id);
    this.demandeService.getDemandeById(id).subscribe(data => {

      let demande: Demande = {
        id: data.body.id,
        version: data.body.version,
        produitId: data.body.produitId,
        nomComplet: data.body.nomComplet,
        email: data.body.email,
        code: data.body.code,
        telephone: data.body.telephone,
        selectionner: data.body.selectionner,
        message: data.body.message,
        lu: 'lu'
      };
      console.log(demande);

       this.demandeService.modifDemande(demande).subscribe(res => {
         console.log(res);
         this._snackBar.open('Succès de l\'opération!', '', {
           duration: 3000,
           verticalPosition: 'top',

         });
         this.demandeService.nbreDemandeNonLu().subscribe(resultat =>{
           if (resultat.body){
               this.dataSource = new MatTableDataSource<Demande>(resultat.body);
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;

           }

         });

       });

    });




  }

openDialog(id: any): void {
  console.log(id);
  this.dialog.open(DemandeSelectComponent,{
    data: {
      demande: id
    }
  });
}
}
