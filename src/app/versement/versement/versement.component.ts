import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddVersementComponent } from '../add-versement/add-versement.component';
import { ListVersementComponent } from '../list-versement/list-versement.component';
import { ClientService } from '../../service/client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Personne } from '../../models/Personne';
import { TerrainVenduService } from '../../service/terrain-vendu.service';
import { TerrainVendu } from 'src/app/models/TerrainVendu';
import {DVersementService } from '../../service/dversement.service';
import { Versement } from '../../models/Versement';
import { DetailVersement } from '../../models/DetailVersement';
export interface Transaction {
  num: string;
  prix: number;
}

@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
  styleUrls: ['./versement.component.scss']
})
export class VersementComponent implements OnInit {
  filterValue: string;
  value = '';
  displayedColumns = ['numero', 'prix'];
  transactions: Transaction[] = [
    {num: '00001', prix: 1000000},
    {num: '00002', prix: 5000000},
    {num: '00003', prix: 2000000},
    {num: '00004', prix: 4000000},
    {num: '00005', prix: 25000000},
    {num: '00006', prix: 15000000},
  ];
  terrainVendus: TerrainVendu[];
  searchClientSource = new BehaviorSubject<string>('');
  oClient: Observable<Personne[]>;
  selectedClient: Personne;
  clients: Personne[];
  client: Personne;
  dversements: DetailVersement[];
  dversement: DetailVersement;
 versement: Versement;
 lastDialog: Versement;
  constructor(public dialog: MatDialog,
    private clientService: ClientService,
    private terrainVenduService: TerrainVenduService,
    private dversementService: DVersementService) { }

  ngOnInit(): void {
    this.oClient = this.searchClientSource
      .pipe(debounceTime(300),
        distinctUntilChanged(),
        switchMap(
          mc => mc ?  this.clientService.rechercheClientParMc(mc)
          : this.clientService.rechercheClientParMc('aucun client trouvé'))
      );

  }
  getTotalCost() {
    return this.terrainVendus.map(t => t.prix).reduce((acc, value) => acc + value, 0);
  }
  onCreate(id: any){
    console.log('id du client', id);
    const dialogRef = this.dialog.open(AddVersementComponent, {
      width: '650px',
      data: {
        client: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dversement = result;
      this.dversementService.dVerementCreer$.subscribe(test => {
        console.log('Voir le subject dans  versement',test);
        this.dversementService.getDVersementByVersement(test.body.versement.id)
        .subscribe(data => {
         if(data.status === 0){
           let array = data.body;
           array.forEach(element => {
             this.versement = element.versement;
           });
         }
        });
      });
    });
    console.log('Voir le subject dans  versement',this.versement);

  }
  doFilter(ev: Event){
     this.filterValue = (ev.target as HTMLInputElement).value;
   // this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.filterValue);
  }
  onList(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ListVersementComponent, dialogConfig);
  }
  search(mc: string) {
    this.searchClientSource.next(mc);
  }
  onSelect(client: Personne) {
   this.selectedClient = client;
    console.log(this.selectedClient.id);
    this.terrainVenduService.getTerrainVenduByIdPersonne(this.selectedClient.id)
    .subscribe(data => {
      if(data.status===0){
        this.clientService.getClientById(this.selectedClient.id)
        .subscribe(res => {
          this.client = res.body;
          console.log(this.client);
        });
        this.terrainVendus = data.body;
      }else{

      }

    });
    this.dversementService.getDVersementByIdClient(this.selectedClient.id)
    .subscribe(data => {
      let array = data.body.map(item => {
        return {
          versement: item.versement,
          ...item
        };
      });
      array.forEach(element => {
        this.versement = element.versement;
      });
      console.log('versement retourné',array);

    });
  }
  findSelectedClientIndex(): number {
    return this.clients.indexOf(this.selectedClient);
  }
  onOpen(id: number){
    console.log('id du client', id);
    const dialogRef = this.dialog.open(ListVersementComponent, {
      width: '650px',
      data: {
        client: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dversement = result;
      this.dversementService.getDVersementByIdClient(this.selectedClient.id)
    .subscribe(data => {
      let array = data.body.map(item => {
        return {
          versement: item.versement,
          ...item
        };
      });
      array.forEach(element => {
        this.versement = element.versement;
      });
      console.log('versement retourné',array);

    });
    });
    console.log('Voir le subject dans  versement',this.versement);
  }

}
