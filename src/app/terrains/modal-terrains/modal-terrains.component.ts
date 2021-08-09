import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TerrainService} from '../../service/terrain.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UpdateTerrainsComponent} from '../update-terrains/update-terrains.component';

@Component({
  selector: 'app-modal-terrains',
  templateUrl: './modal-terrains.component.html',
  styleUrls: ['./modal-terrains.component.scss']
})
export class ModalTerrainsComponent implements OnInit {
  terrain: Terrain;
  tForm: FormGroup;
  terrains: Terrain[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private terrainService: TerrainService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Terrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateTerrainsComponent>) { }

  ngOnInit(): void {
    this.terrainService.getTerrainById(this.data['terrain'])
      .subscribe(res => {
        console.log(res.body);
        this.terrain = res.body;
        this.tForm = this.fb.group({
          id: this.terrain.id,
          version: this.terrain.version ,
          libelle: this.terrain.libelle,
          description: this.terrain.description,
        /*  prix: this.terrain.prix,*/
          path: this.terrain.path,
          /*latitude: this.terrain.latitude,
          longitude: this.terrain.longitude,*/
          numero: this.terrain.numero,
         /* document: this.terrain.document,*/
          ville: this.terrain.ville,
          /*paye: this.terrain.paye,
          abonneGeo: this.terrain.abonneGeo,
          unite: this.terrain.unite,*/
         /* note: this.terrain.note,
          prixParMettreCarre: this.terrain.prixParMettreCarre,
          superficie: this.terrain.superficie,*/
          type: this.terrain.type
        });
      });
  }

  onSubmit() {
    let formValue = this.tForm.value;
    this.terrain = this.tForm.value;
    this.terrainService.modifTerrain(this.terrain).subscribe(data => {
      if (data){
        this.terrain = data.body;
        this.dialogRef.close(this.terrain);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['terrain']);

  }
}
