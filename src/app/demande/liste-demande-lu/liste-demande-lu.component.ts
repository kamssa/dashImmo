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
import {DemandeSelectComponent} from '../demande-select/demande-select.component';

@Component({
  selector: 'app-liste-demande-lu',
  templateUrl: './liste-demande-lu.component.html',
  styleUrls: ['./liste-demande-lu.component.scss']
})
export class ListeDemandeLuComponent implements OnInit {
  displayedColumns: string[] = ['date', 'nomComplet', 'email', 'telephone', 'selection', 'supprimer'];
  dataSource: MatTableDataSource<Demande>;
  demandes: Demande[];
  demande: Demande;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private demandeService: DemandeService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.demandeService.getAllDemande().subscribe(data => {
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


  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.demandeService.supprimerDemande(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
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
