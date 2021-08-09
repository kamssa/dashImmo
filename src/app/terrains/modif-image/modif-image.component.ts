import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Ville} from '../../models/combo/Ville';
import {TerrainService} from '../../service/terrain.service';
import {VilleService} from '../../service/ville.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-modif-image',
  templateUrl: './modif-image.component.html',
  styleUrls: ['./modif-image.component.scss']
})
export class ModifImageComponent implements OnInit {
  terrain: Terrain;
  tFormModifImage: FormGroup;
  terrains: Terrain[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  selectedFile: File = null;
  villes: Ville[];
  ville: Ville;
  message: string;
  constructor( private terrainService: TerrainService,
               private villeService: VilleService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Terrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<ModifImageComponent>) { }

  ngOnInit(): void {

    this.terrainService.getTerrainById(this.data['terrain'])
      .subscribe(res => {
        console.log(res.body);
        this.terrain = res.body;
        this.tFormModifImage = this.fb.group({
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
    let formValue = this.tFormModifImage.value;
    this.terrain = this.tFormModifImage.value;
    console.log(this.terrain);
    let terrain: Terrain = {
      id: this.terrain.id,
      version: this.terrain.version,
      libelle : this.terrain.libelle,
      description: this.terrain.description,
      path: this.selectedFiles.item(0).name,
      type: 'TE'
    };
    console.log(terrain);
    this.terrainService.modifTerrain(terrain).subscribe(data => {
      console.log('terrain doc enregistre avec succes', data);
      console.log(data.body.id);
      if (data.body.id) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('multipartFile', this.currentFile);
        console.log('formdata', formData);
        this.terrainService.uploadImage(formData, data.body.id).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);

            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            this.dialogRef.close(this.terrain);
            this.snackBar.open(' succès de la modification!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          },
          err => {
            this.progress = 0;
            this.message = 'Le fichier ne peut etre archivé !';
            this.currentFile = undefined;
          });
        this.selectedFiles = undefined;
      }

    }, err => {
      console.log('échec operation');
    });
    this.router.navigate(['/listTerrains']);

  }


  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
}
