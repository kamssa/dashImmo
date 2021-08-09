import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {VilleService} from '../../service/ville.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';

@Component({
  selector: 'app-update-produit-vendu',
  templateUrl: './update-produit-vendu.component.html',
  styleUrls: ['./update-produit-vendu.component.scss']
})
export class UpdateProduitVenduComponent implements OnInit {
  terrainAcheter: TerrainAcheter;
  tvForm: FormGroup;
  terrainAcheters: TerrainAcheter[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor( private terrainAcheterService: TerrainAcheterService,
               private villeService: VilleService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Terrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateProduitVenduComponent>) { }

  ngOnInit(): void {
    this.terrainAcheterService.getTerrainAcheterById(this.data['terrainAcheter'])
      .subscribe(res => {
        console.log('terrain vendu', res.body);
        this.terrainAcheter = res.body;
        this.tvForm = this.fb.group({
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
    let formValue = this.tvForm.value;
    this.terrainAcheter = this.tvForm.value;
    console.log(this.terrainAcheter);
    this.terrainAcheterService.modifTerrainAcheter(this.terrainAcheter).subscribe(data => {
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


}
