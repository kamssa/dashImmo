import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {Produit} from '../../models/Produit';
import {Personne} from '../../models/Personne';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';
import {ProduitService} from '../../service/produit.service';
import {ClientService} from '../../service/client.service';
import {PersonneService} from '../../service/personne.service';
import {Location} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Terrain} from '../../models/Terrain';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TerrainService} from '../../service/terrain.service';
import {Document} from '../../models/Document';
import {Ville} from '../../models/combo/Ville';

@Component({
  selector: 'app-update-coord',
  templateUrl: './update-coord.component.html',
  styleUrls: ['./update-coord.component.scss']
})
export class UpdateCoordComponent implements OnInit {
  terrainAcheter: TerrainAcheter;
  tForm: FormGroup;
  terrainAcheters: TerrainAcheter[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  selectedFile: File = null;
  file: any;
  progress = 0;

  latitude: any;
  longitude: any;
  constructor( private terrainAcheterService: TerrainAcheterService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: TerrainAcheter,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateCoordComponent>) { }

  ngOnInit(): void {
    this.terrainAcheterService.getTerrainAcheterById(this.data['terrainAcheter'])
      .subscribe(res => {
        console.log(res.body);
        this.terrainAcheter = res.body;
        this.tForm = this.fb.group({
          id: this.terrainAcheter.id,
          version: this.terrainAcheter.version ,
          detailTerrain: this.fb.group({
             id : this.terrainAcheter.detailTerrain.id,
             version: this.terrainAcheter.detailTerrain.version,
              libelle:  this.terrainAcheter.detailTerrain.libelle,
             paye:  this.terrainAcheter.detailTerrain.paye,
             abonneGeo:  this.terrainAcheter.detailTerrain.abonneGeo,
              unite:  this.terrainAcheter.detailTerrain.unite,
             note:  this.terrainAcheter.detailTerrain.note,
             prixParMettreCarre:  this.terrainAcheter.detailTerrain.prixParMettreCarre,
             superficie:  this.terrainAcheter.detailTerrain.superficie,
             surfaceUtilise:  this.terrainAcheter.detailTerrain.surfaceUtilise,
             description:  this.terrainAcheter.detailTerrain.description,
             latitude:  this.terrainAcheter.detailTerrain.latitude,
             longitude:  this.terrainAcheter.detailTerrain.longitude,
             numero:  this.terrainAcheter.detailTerrain.numero,
             prix:  this.terrainAcheter.detailTerrain.prix,
             terrain:  this.terrainAcheter.detailTerrain.terrain,
             document:  this.terrainAcheter.detailTerrain.document

          }),
          personne: this.terrainAcheter.personne
        });
      });
  }

  onSubmit() {
    let formValue = this.tForm.value;
    console.log(this.terrainAcheter);
    let terrainAcheter: TerrainAcheter = {
      id: formValue.id,
      version: formValue.version ,
        detailTerrain: {
          id : formValue.detailTerrain.id,
          version: formValue.detailTerrain.version,
          libelle: formValue.detailTerrain.libelle,
          paye: formValue.detailTerrain.paye,
          abonneGeo: formValue.detailTerrain.abonneGeo,
          unite:  formValue.detailTerrain.unite,
          note:  formValue.detailTerrain.note,
          prixParMettreCarre:  formValue.detailTerrain.prixParMettreCarre,
          superficie:  formValue.detailTerrain.superficie,
          surfaceUtilise:  formValue.detailTerrain.surfaceUtilise,
          description:  formValue.detailTerrain.description,
          latitude:  this.latitude,
          longitude: this.longitude,
          numero:  formValue.detailTerrain.numero,
          prix:  formValue.detailTerrain.prix,
          terrain:  formValue.detailTerrain.terrain,
          document:  formValue.detailTerrain.document
        },
      personne: formValue.personne
      };
    console.log(terrainAcheter);
    this.terrainAcheterService.modifTerrainAcheter(terrainAcheter).subscribe(data => {
      if (data){
        console.log(data.body);
        this.terrainAcheter = data.body;
        this.dialogRef.close(this.terrainAcheter);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['terrainVendu']);
  }

  coord() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.snackBar.open(' Coordonnées géographiques récupérées!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }
}
