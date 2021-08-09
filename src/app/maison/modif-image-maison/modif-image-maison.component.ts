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
import {Maison} from '../../models/Maison';
import {MaisonService} from '../../service/maison.service';

@Component({
  selector: 'app-modif-image-maison',
  templateUrl: './modif-image-maison.component.html',
  styleUrls: ['./modif-image-maison.component.scss']
})
export class ModifImageMAisonComponent implements OnInit {
  maison: Maison;
  tFormModifImage: FormGroup;
  maisons: Maison[];
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
  constructor( private maisonService: MaisonService,
               private villeService: VilleService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Maison,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<ModifImageMAisonComponent>) { }

  ngOnInit(): void {

    this.maisonService.getMaisonById(this.data['maison'])
      .subscribe(res => {
        console.log(res.body);
        this.maison = res.body;
        this.tFormModifImage = this.fb.group({
          id: this.maison.id,
          version: this.maison.version ,
          libelle: this.maison.libelle,
          description: this.maison.description,
          path: this.maison.path,
          numero: this.maison.numero,

          ville: this.fb.group({
            libelle: this.maison?.ville?.libelle
          }),
          type: this.maison.type
        });
      });
  }

  onSubmit() {
    let formValue = this.tFormModifImage.value;
    this.maison = this.tFormModifImage.value;
    console.log(this.maison);
    let maison: Terrain = {
      id: this.maison.id,
      version: this.maison.version,
      libelle : this.maison.libelle,
      description: this.maison.description,
      path: this.selectedFiles.item(0).name,
      type: 'MA'
    };
    console.log(maison);
    this.maisonService.modifMaison(maison).subscribe(data => {
      console.log('terrain doc enregistre avec succes', data);
      console.log(data.body.id);
      if (data.body.id) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('multipartFile', this.currentFile);
        console.log('formdata', formData);
        this.maisonService.uploadImage(formData, data.body.id).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);

            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            this.dialogRef.close(this.maison);
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
    this.router.navigate(['/listMaison']);

  }


  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
}
