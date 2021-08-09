import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Ville} from '../../models/combo/Ville';
import {TerrainService} from '../../service/terrain.service';
import {VilleService} from '../../service/ville.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DemandeService} from '../../service/demande.service';
import {Demande} from '../../models/Demande';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {DetailTerrain} from '../../models/DetailTerrain';

@Component({
  selector: 'app-demande-select',
  templateUrl: './demande-select.component.html',
  styleUrls: ['./demande-select.component.scss']
})
export class DemandeSelectComponent implements OnInit {
  demande: Demande;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  detailTerrain: DetailTerrain;
  constructor( private demandeService: DemandeService,
               private detailTerrainService: DetailTerrainService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Demande,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<DemandeSelectComponent>) { }

  ngOnInit(): void {
    this.demandeService.getDemandeById(this.data['demande'])
      .subscribe(res => {
        console.log(res.body);
        this.demande = res.body;
        this.detailTerrainService.getDetailTerrainById(this.demande.produitId)
          .subscribe(data => {
            this.detailTerrain = data.body;
          });
      });

  }

}
