import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TerrainService} from '../../service/terrain.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Ville} from '../../models/combo/Ville';
import {VilleService} from '../../service/ville.service';

@Component({
  selector: 'app-update-terrains',
  templateUrl: './update-terrains.component.html',
  styleUrls: ['./update-terrains.component.scss']
})
export class UpdateTerrainsComponent implements OnInit {
  terrain: Terrain;
  tForm: FormGroup;
  terrains: Terrain[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  villes: Ville[];
  ville: Ville;
  constructor( private terrainService: TerrainService,
               private villeService: VilleService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Terrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateTerrainsComponent>) { }

  ngOnInit(): void {
    this.villeService.getAllVille().subscribe(data => {
      console.log(data);
      this.villes = data.body;
    });
    this.terrainService.getTerrainById(this.data['terrain'])
      .subscribe(res => {
        console.log(res.body);
        this.terrain = res.body;
        this.tForm = this.fb.group({
          id: this.terrain.id,
          version: this.terrain.version ,
          libelle: this.terrain.libelle,
          description: this.terrain.description,
          path: this.terrain.path,
          numero: this.terrain.numero,

          ville: this.fb.group({
            libelle: this.terrain?.ville?.libelle
          }),
          type: this.terrain.type
        });
      });
  }

  onSubmit() {
    let formValue = this.tForm.value;
    this.terrain = this.tForm.value;
    console.log(this.terrain);
    this.terrainService.modifTerrain(this.terrain).subscribe(data => {
      if (data){
        console.log(data.body);
        this.terrain = data.body;
        this.dialogRef.close(this.terrain);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['listTerrains']);

  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  greetVille(event) {

    console.log('Voir le select', event.value);
    this.villeService.getVilleByLibelle(event.value).subscribe(data => {
      this.ville = data.body;
      console.log('valeur de retour de ville', this.ville);
    });

  }
}
