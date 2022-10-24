import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-image-accueil',
  templateUrl: './list-image-accueil.component.html',
  styleUrls: ['./list-image-accueil.component.scss']
})
export class ListImageAccueilComponent implements OnInit {

  displayedColumns: string[] = ['libelle', 'image',  'modifierImage', 'supprimer'];


  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
             ) {
  }
  ngOnInit(): void {

  }


}
