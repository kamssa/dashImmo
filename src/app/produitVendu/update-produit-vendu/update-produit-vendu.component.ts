import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {VilleService} from '../../service/ville.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TerrainVenduService} from '../../service/terrain-vendu.service';
import {TerrainVendu} from '../../models/TerrainVendu';

@Component({
  selector: 'app-update-produit-vendu',
  templateUrl: './update-produit-vendu.component.html',
  styleUrls: ['./update-produit-vendu.component.scss']
})
export class UpdateProduitVenduComponent implements OnInit {
  terrainVendu: TerrainVendu;
  tvForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor( 
               private terrainVenduService: TerrainVenduService,
               private villeService: VilleService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Terrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateProduitVenduComponent>) { }

  ngOnInit(): void {
    this.terrainVenduService.getTerrainVenduById(this.data['terrainVendu'])
      .subscribe(res => {
        console.log('terrain vendu', res.body);
        this.terrainVendu = res.body;
        this.tvForm = this.fb.group({
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
    let formValue = this.tvForm.value;
    this.terrainVendu = this.tvForm.value;
    console.log(this.terrainVendu);
    this.terrainVenduService.modifTerrainVendu(this.terrainVendu).subscribe(data => {
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
    this.router.navigate(['terrainVendu']);

  }


}
