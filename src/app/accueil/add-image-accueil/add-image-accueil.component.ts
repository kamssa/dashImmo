import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ImageAccueil} from '../../models/ImageAccueil';
import {ImageAccueilService} from '../../service/imageAccueil.service';

@Component({
  selector: 'app-add-image-accueil',
  templateUrl: './add-image-accueil.component.html',
  styleUrls: ['./add-image-accueil.component.scss']
})
export class AddImageAccueilComponent implements OnInit {
  imageForm: FormGroup;
  imageAccueilId: number;
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;
  message = '';

  imageAccueil: ImageAccueil;
  selected: string;
  constructor(private  fb: FormBuilder, private imageAccueilService: ImageAccueilService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddImageAccueilComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.initForm();
  }
  ngAfterViewInit(): void {


  }

  initForm(): void{

    this.imageForm = this.fb.group({
      libelle: ['Gstoreplus', Validators.required],

    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
    console.log('Voir le ichier selectionne', this.selectedFile);
  }
  onSubmit(): void {
    let formValue = this.imageForm.value;
    let imageAccueil: ImageAccueil = {
      libelle : formValue.libelle,
      path: this.selectedFiles.item(0).name,
    };

    console.log('Voir les infos du imageAccueil ', imageAccueil);
    this.imageAccueilService.ajoutImageAccueil(imageAccueil).subscribe(data => {
      console.log('terrain doc enregistre avec succes', data);
      this.imageAccueilId = data.body.id;
      this.imageAccueil = data.body;
      console.log(this.imageAccueilId);
      if (this.imageAccueilId) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('multipartFile', this.currentFile);
        console.log('formdata', formData);
        this.imageAccueilService.uploadImageAccueil(formData, this.imageAccueilId).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);

            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
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
    this.router.navigate(['/imageAccueil']);
  }
}
