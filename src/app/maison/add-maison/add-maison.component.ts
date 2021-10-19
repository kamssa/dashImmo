import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Ville} from '../../models/combo/Ville';
import {Maison} from '../../models/Maison';
import {MaisonService} from '../../service/maison.service';
import {DocumentService} from '../../service/document.service';
import {VilleService} from '../../service/ville.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Document} from '../../models/Document';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-maison',
  templateUrl: './add-maison.component.html',
  styleUrls: ['./add-maison.component.scss']
})
export class AddMaisonComponent implements OnInit {
  maisonForm: FormGroup;
  editMode: boolean;
  maisonId: number;
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;
  message = '';
  documents: Document[];
  document: Document;
  villes: Ville[];
  ville: Ville;
  maison: Maison;
  selected: string;
  constructor(private  fb: FormBuilder, private maisonService: MaisonService,
              private documentService: DocumentService,
              private villeService: VilleService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddMaisonComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.villeService.getAllVille().subscribe(data => {
      console.log(data);
      this.villes = data.body;
    });
    this.initForm();
  }

  initForm(): void{

    this.maisonForm = this.fb.group({
      libelle: ['', Validators.required],
      description: [''],
      surfaceUtile: [''],
      surfaceTerrain: [''],
      maisonType: [''],
      prix: [''],
      ville: this.fb.group({
        id: '',
        version: '',
        libelle: ''
      })
    });


  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  onSubmit(): void {
    let formValue = this.maisonForm.value;
    let maison: Maison = {
      libelle : formValue.libelle,
      description: formValue.description,
      path: this.selectedFiles.item(0).name,
      ville: {
        id: this.ville.id,
        version: this.ville.version,
        libelle: formValue.ville.libelle
      },
      type: 'MA',
      surfaceUtile: formValue.surfaceUtile,
      surfaceTerrain: formValue.surfaceTerrain,
      maisonType: formValue.maisonType,
      prix: formValue.prix
    };

    console.log('Voir les infos de la maison ', maison);
    this.maisonService.ajoutMaison(maison).subscribe(data => {
      console.log('maison doc enregistre avec succes', data);
      this.maisonId = data.body.id;
      this.maison = data.body;
      console.log(this.maisonId);
      if (this.maisonId) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('multipartFile', this.currentFile);
        console.log('formdata', formData);
        this.maisonService.uploadImage(formData, this.maisonId).subscribe(
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

  }

  greetVille(event) {

    console.log('Voir le select', event.value);
    this.villeService.getVilleByLibelle(event.value).subscribe(data => {
      this.ville = data.body;
      console.log('valeur de retour de ville', this.ville);
    });

  }
 /* greetCat(event){
    console.log(event.value);
    this.documentService.getDocumentById(event.value).subscribe(data => {
      console.log('Valeur de retour de doc', this.document);
      this.document = data.body;

    });
  }*/

}
