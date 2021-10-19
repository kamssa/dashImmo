import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddVersementComponent } from '../add-versement/add-versement.component';
import { ListVersementComponent } from '../list-versement/list-versement.component';
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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  getTotalCost() {
    return this.transactions.map(t => t.prix).reduce((acc, value) => acc + value, 0);
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddVersementComponent, dialogConfig);
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
}
