import {Component, OnInit, ViewChild} from '@angular/core';
import {UpdateProduitVenduComponent} from '../update-produit-vendu/update-produit-vendu.component';
import {AddTerrainsComponent} from '../../terrains/add-terrains/add-terrains.component';
import {AddProduitComponent} from '../add-produit/add-produit.component';
import {MatTableDataSource} from '@angular/material/table';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';
import {UpdateCoordComponent} from '../update-coord/update-coord.component';
import {Demande} from '../../models/Demande';

@Component({
  selector: 'app-list-produit-vendu',
  templateUrl: './list-produit-vendu.component.html',
  styleUrls: ['./list-produit-vendu.component.scss']
})
export class ListProduitVenduComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'numero', 'nomComplet', 'telephone', 'cord', 'update', 'supprimer'];
  dataSource: MatTableDataSource<TerrainAcheter>;
  terrainAcheters: TerrainAcheter[];
  terrainAcheter: TerrainAcheter;
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private terrainAcheterService: TerrainAcheterService,
              public dialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.terrainAcheterService.getAllTerrainAcheter().subscribe(data => {
      this.terrainAcheters = data.body;
      console.log('Voir ce qui se passe', data.body);
      if(data.body){
        this.terrainAcheters.forEach(value => {
          let opp : TerrainAcheter = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<TerrainAcheter>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProduitComponent, {
      width: '650px',
      data: this.terrainAcheter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.terrainAcheter = result;
      this.router.navigate(['terrainVendu']);

    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateProduitVenduComponent,{
      data: {
        terrainAcheter: id
      }
    });
  }
  redirectToDelete(id: any) {
    if (confirm("Voulez vous vraiment supprimer le terrain acheté ?")) {
      this.terrainAcheterService.supprimerTerrainAcheter(id).subscribe(data => {
        if(data){
          this.terrainAcheterService.getAllTerrainAcheter()
            .subscribe(res => {
              if(res.body){
                this.dataSource = new MatTableDataSource<TerrainAcheter>(res.body);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }

            });
        }
        this.router.navigate(['terrainVendu']);
      });
    }
  }

  redirectToCord(id: any) {
    console.log(id);
    this.dialog.open(UpdateCoordComponent,{
      data: {
        terrainAcheter: id
      }
    });
  }
}
