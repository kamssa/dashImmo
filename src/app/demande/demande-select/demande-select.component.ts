import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DemandeService} from '../../service/demande.service';
import {Demande} from '../../models/Demande';
import {TerrainService} from '../../service/terrain.service';


@Component({
  selector: 'app-demande-select',
  templateUrl: './demande-select.component.html',
  styleUrls: ['./demande-select.component.scss']
})
export class DemandeSelectComponent implements OnInit {
  demande: Demande;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  terrain: Terrain;
  constructor( private demandeService: DemandeService,
               private terrainService: TerrainService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Demande,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<DemandeSelectComponent>) { }

  ngOnInit(): void {
    this.demandeService.getDemandeById(this.data['demande'])
      .subscribe(res => {
        console.log(res.body);
        this.demande = res.body;
        this.terrainService.getDetailTerrainById(this.demande.produitId)
          .subscribe(data => {
            this.terrain = data.body;
          });
      });

  }

}
