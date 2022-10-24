import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TerrainVendu} from '../../models/TerrainVendu';
import {TerrainVenduService} from '../../service/terrain-vendu.service';

@Component({
  selector: 'app-coordonnes',
  templateUrl: './coordonnes.component.html',
  styleUrls: ['./coordonnes.component.scss']
})
export class CoordonnesComponent implements OnInit {
  terrainVendu: TerrainVendu;
  terrainVendus: TerrainVendu[];
  tForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  latitude: any;
  longitude: any;
  constructor(
               public terrainVenduService: TerrainVenduService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: TerrainVendu,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<CoordonnesComponent>) { }

  ngOnInit(): void {
    this.terrainVenduService.getTerrainVenduById(this.data['terrainVendu'])
      .subscribe(res => {
        console.log(res.body);
        this.terrainVendu = res.body;
        this.tForm = this.fb.group({
          id: this.terrainVendu.id,
          version: this.terrainVendu.version ,
          libelle: this.terrainVendu.libelle,
          paye: this.terrainVendu.paye,
          abonneGeo: this.terrainVendu.abonneGeo,
          unite: this.terrainVendu.unite,
          note: this.terrainVendu.note,
          prixParMettreCarre: this.terrainVendu.prixParMettreCarre,
          superficie: this.terrainVendu.superficie,
          surfaceUtilise: this.terrainVendu.surfaceUtilise,
          description: this.terrainVendu.description,
          latitude: this.terrainVendu.latitude,
          longitude: this.terrainVendu.longitude,
          numero: this.terrainVendu.numero,
          prix: this.terrainVendu.prix,
          path: this.terrainVendu.path,
          nomVille: this.terrainVendu.nomVille,
          typeDocument: this.terrainVendu.typeDocument,
          personne: this.terrainVendu.personne
        });
      });
  }

  onSubmit() {
    let formValue = this.tForm.value;
    let terrainVendu: TerrainVendu = {
        id: this.terrainVendu.id,
        version: this.terrainVendu.version ,
        libelle: this.terrainVendu.libelle,
        paye: this.terrainVendu.paye,
        abonneGeo: this.terrainVendu.abonneGeo,
        unite: this.terrainVendu.unite,
        note: this.terrainVendu.note,
        prixParMettreCarre: this.terrainVendu.prixParMettreCarre,
        superficie: this.terrainVendu.superficie,
        surfaceUtilise: this.terrainVendu.surfaceUtilise,
        description: this.terrainVendu.description,
        latitude: this.latitude,
        longitude: this.longitude,
        numero: this.terrainVendu.numero,
        prix: this.terrainVendu.prix,
        path: this.terrainVendu.path,
        nomVille: this.terrainVendu.nomVille,
        typeDocument: this.terrainVendu.typeDocument,
        personne: this.terrainVendu.personne
      };
    console.log(terrainVendu);
    this.terrainVenduService.modifTerrainVendu(terrainVendu).subscribe(data => {
      if (data){
        console.log(data.body);
        this.terrainVendu = data.body;
        this.dialogRef.close(this.terrainVendu);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['terrainAGEO']);
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
   onClose() {

    this.dialogRef.close();
  }
}
