import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Document} from '../../models/Document';
import {Ville} from '../../models/combo/Ville';
import {FlashMaison} from '../../models/FlashMaison';
import {FlashMaisonService} from '../../service/flash-maison.service';
import {DocumentService} from '../../service/document.service';
import {VilleService} from '../../service/ville.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-flash-maison',
  templateUrl: './add-flash-maison.component.html',
  styleUrls: ['./add-flash-maison.component.scss']
})
export class AddFlashMaisonComponent implements OnInit {
  flashMaisonForm: FormGroup;
  editMode: boolean;
  flashMaisonId: number;
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
  flashMaison: FlashMaison;
  selected: string;
  constructor(private  fb: FormBuilder, private flashMaisonService: FlashMaisonService,
              private documentService: DocumentService,
              private villeService: VilleService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddFlashMaisonComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.documentService.getAllDocument().subscribe(data => {
      console.log(data);
      this.documents = data.body;
    });
    this.villeService.getAllVille().subscribe(data => {
      if (data.status === 0){
        this.villes = data.body;
        console.log(this.villes);
      }
    });
    this.initForm();
  }
  ngAfterViewInit(): void {
    if (this.document && this.ville){
      this.flashMaisonForm = this.fb.group({
        libelle: ['', Validators.required],
        description: [''],
        surfaceUtile: [''],
        surfaceTerrain: [''],
        flashmaisonType: [''],
        prix: [''],
        ville: this.fb.group({
          id: '',
          version: '',
          libelle: ''
        })
      });
    }

  }

  initForm(): void{

    this.flashMaisonForm = this.fb.group({
      libelle: ['', Validators.required],
      description: [''],
      surfaceUtile: [''],
      surfaceTerrain: [''],
      flashmaisonType: [''],
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

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
    console.log('Voir le ichier selectionne', this.selectedFile);
  }
  onSubmit(): void {
    let formValue = this.flashMaisonForm.value;
    let flashMaison: FlashMaison = {
      libelle : formValue.libelle,
      description: formValue.description,
      path: this.selectedFiles.item(0).name,
      ville: {
        id: this.ville.id,
        version: this.ville.version,
        libelle: formValue.ville.libelle
      },
      type: 'FM',
      surfaceUtile: formValue.surfaceUtile,
      surfaceTerrain: formValue.surfaceTerrain,
      flashmaisonType: formValue.flashmaisonType,
      prix: formValue.prix
    };
    this.flashMaisonService.ajoutFlashMaison(flashMaison).subscribe(data => {
      this.flashMaisonId = data.body.id;
      this.flashMaison = data.body;
      console.log(this.flashMaisonId);
      if (this.flashMaisonId) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('multipartFile', this.currentFile);
        console.log('formdata', formData);
        this.flashMaisonService.uploadImage(formData, this.flashMaisonId).subscribe(
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

}
