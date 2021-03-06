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
import {TerrainVendu} from '../../models/TerrainVendu';
import {TerrainVenduService} from '../../service/terrain-vendu.service';

@Component({
  selector: 'app-update-coord',
  templateUrl: './update-coord.component.html',
  styleUrls: ['./update-coord.component.scss']
})
export class UpdateCoordComponent implements OnInit {
  terrainAcheter: TerrainAcheter;
  terrainVendu: TerrainVendu;
  terrainVendus: TerrainVendu[];
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
               private terrainVenduService: TerrainVenduService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: TerrainAcheter,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateCoordComponent>) { }

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
    console.log(this.terrainAcheter);
    let terrainVendu: TerrainVendu = {
        id: formValue.id,
        version: formValue.version ,
        libelle: formValue.libelle,
        paye: formValue.paye,
        abonneGeo: formValue.abonneGeo,
        unite: formValue.unite,
        note: formValue.note,
        prixParMettreCarre: formValue.prixParMettreCarre,
        superficie: formValue.superficie,
        surfaceUtilise: formValue.surfaceUtilise,
        description: formValue.description,
        latitude: this.latitude,
        longitude: this.longitude,
        numero: formValue.numero,
        prix: formValue.prix,
        path: formValue.path,
        nomVille: formValue.nomVille,
        typeDocument: formValue.typeDocument,
        personne: formValue.personne
      };
    console.log(terrainVendu);
    this.terrainVenduService.modifTerrainVendu(terrainVendu).subscribe(data => {
      if (data){
        console.log(data.body);
        this.terrainAcheter = data.body;
        this.dialogRef.close(this.terrainAcheter);
        this.snackBar.open(' succ??s de la modification!', '', {
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
        this.snackBar.open(' Coordonn??es g??ographiques r??cup??r??es!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }
}
