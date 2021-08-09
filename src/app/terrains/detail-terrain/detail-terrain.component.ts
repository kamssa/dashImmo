import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DetailTerrain} from '../../models/DetailTerrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Terrain} from '../../models/Terrain';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TerrainService} from '../../service/terrain.service';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DetailImageService} from '../../service/detail-image.service';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {DocumentService} from '../../service/document.service';
import {Document} from '../../models/Document';


@Component({
  selector: 'app-detail-terrain',
  templateUrl: './detail-terrain.component.html',
  styleUrls: ['./detail-terrain.component.scss']
})
export class DetailTerrainComponent implements OnInit {
  detailTerrainForm: FormGroup;
  terrain: Terrain;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  progress: any;
  message: any;
  document: Document;
  documents: Document[];
  urls = [];
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files = [];
  selected: any;
  constructor( private terrainService: TerrainService,
               private documentService: DocumentService,
               private detailTerrainService: DetailTerrainService,
               private detailImageService: DetailImageService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Terrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<DetailTerrainComponent>) { }

  ngOnInit(): void {
    this.documentService.getAllDocument().subscribe(data => {
      console.log(data);
      this.documents = data.body;
    });
    this.terrainService.getTerrainById(this.data['terrain'])
      .subscribe(res => {
        console.log(res.body);
        this.terrain = res.body;
        this.detailTerrainForm = this.fb.group({
          id: '',
          version: '' ,
          libelle: '',
           paye: '',
           abonneGeo: '',
           unite: '',
           note: '',
           prixParMettreCarre: '',
           superficie: '',
           surfaceUtilise: '',
           description: '',
           latitude: '',
           longitude: '',
           numero: '',
           prix: '',
          terrain: this.fb.group({
            id: this.terrain.id,
            version: this.terrain.version,
             libelle: this.terrain.libelle,
             description : this.terrain.description,
            path: this.terrain.path,
            numero: this.terrain.numero,
            ville: this.terrain.ville,
            type: this.terrain.type
          }),
           document: this.fb.group({
        id: '',
        version: '',
        libelle: '',
        description: ''
      }),
        });
      });
  }
  uploadFile(file, id: number) {
    console.log('Voir les fichiers', file);
    const formData = new FormData();
    formData.append('multipartFile', file.data);
    file.inProgress = true;
    this.detailImageService.uploadDetail(formData, id).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }

  private uploadFiles(id) {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file, id);
    });
  }

  onSubmit() {
    let formValue = this.detailTerrainForm.value;
    console.log(formValue);
    let  detailTerrain: DetailTerrain = {
      libelle: formValue.libelle,
      paye: formValue.paye,
      abonneGeo: formValue.abonneGeo,
      unite: formValue.unite,
      note: formValue.note,
      prixParMettreCarre: formValue.prixParMettreCarre,
      superficie: formValue.superficie,
      surfaceUtilise: formValue.surfaceUtilise,
      description: formValue.description,
      latitude: formValue.latitude,
      longitude: formValue.longitude,
      numero: formValue.numero,
      prix: formValue.prix,
      terrain: {
        id: this.terrain.id,
        version: this.terrain.version,
        libelle: this.terrain.libelle,
        description : this.terrain.description,
        path: this.terrain.path,
        numero: this.terrain.numero,
        ville: this.terrain.ville,
        type: this.terrain.type
      },
      document: this.document
    };
    this.detailTerrainService.ajoutDetailTerrain(detailTerrain).subscribe(result => {
      if (result.status === 0){
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {
          for(let index = 0; index < fileUpload.files.length; index++) {
            const file = fileUpload.files[index];
            this.files.push({data: file, inProgress: false, progress: 0});
          }
          this.uploadFiles(result.body.id);
        };
        fileUpload.click();
      }
    });

  }
  greetCat(event){
  console.log(event.value);
  this.documentService.getDocumentByNom(event.value).subscribe(data => {
    this.document = data.body;
    console.log('Valeur de retour de Document', this.document);

  });
}
}
