import { Component, OnInit } from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Ville} from '../../models/combo/Ville';
import {Terrain} from '../../models/Terrain';
import {TerrainService} from '../../service/terrain.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DocumentService} from '../../service/document.service';
import {VilleService} from '../../service/ville.service';
import {Document} from '../../models/Document';

@Component({
  selector: 'app-add-terrains',
  templateUrl: './add-terrains.component.html',
  styleUrls: ['./add-terrains.component.scss']
})
export class AddTerrainsComponent implements OnInit {
  terrainForm: FormGroup;
  terrainId: number;
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
  terrain: Terrain;
  selected: string;
  constructor(private  fb: FormBuilder, private terrainService: TerrainService,
              private documentService: DocumentService,
              private villeService: VilleService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddTerrainsComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.documentService.getAllDocument().subscribe(data => {
      console.log(data);
      this.documents = data.body;
    });
    this.villeService.getAllVille().subscribe(data => {
      console.log(data);
      this.villes = data.body;
    });
    this.initForm();
  }
  ngAfterViewInit(): void {


  }

  initForm(): void{

    this.terrainForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
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
    let formValue = this.terrainForm.value;
    let terrain: Terrain = {
      libelle : formValue.libelle,
      description: formValue.description,
      path: this.selectedFiles.item(0).name,
      ville: {
        id: this.ville.id,
        version: this.ville.version,
        libelle: formValue.ville.libelle
      },
      type: 'TE'
    };

    console.log('Voir les infos du terrain ', terrain);
    this.terrainService.ajoutTerrain(terrain).subscribe(data => {
      console.log('terrain doc enregistre avec succes', data);
      this.terrainId = data.body.id;
      this.terrain = data.body;
      console.log(this.terrainId);
      if (this.terrainId) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('multipartFile', this.currentFile);
        console.log('formdata', formData);
        this.terrainService.uploadImage(formData, this.terrainId).subscribe(
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
    this.router.navigate(['/listTerrains']);
  }

  greetVille(event) {

    console.log('Voir le select', event.value);
    this.villeService.getVilleByLibelle(event.value).subscribe(data => {
      this.ville = data.body;
      console.log('valeur de retour de ville', this.ville);
    });

  }

}
