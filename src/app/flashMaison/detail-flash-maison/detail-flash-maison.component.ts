import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Maison} from '../../models/Maison';
import {Document} from '../../models/Document';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DocumentService} from '../../service/document.service';
import {DetailImageService} from '../../service/detail-image.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';
import {FlashMaisonService} from '../../service/flash-maison.service';
import {FlashMaison} from '../../models/FlashMaison';
import {DetailFlashMaison} from '../../models/DetailFlashMaison';
import {DetailFlashMaisonService} from '../../service/detail-flash-maison.service';

@Component({
  selector: 'app-detail-flash-maison',
  templateUrl: './detail-flash-maison.component.html',
  styleUrls: ['./detail-flash-maison.component.scss']
})
export class DetailFlashMaisonComponent implements OnInit {

  detailFlashMaisonForm: FormGroup;
  flashMaison: FlashMaison;
  document: Document;
  documents: Document[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  progress: any;
  message: any;
  urls = [];
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files = [];
  selected: any;
  constructor( private flashMaisonService: FlashMaisonService,
               private documentService: DocumentService,
               private detailFlashMaisonService: DetailFlashMaisonService,
               private detailImageService: DetailImageService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Maison,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<DetailFlashMaisonComponent>) { }

  ngOnInit(): void {
    this.documentService.getAllDocument()
      .subscribe(res => {
        this.documents = res.body;
      });
    this.flashMaisonService.getFlashMaisonById(this.data['flashMaison'])
      .subscribe(res => {
        console.log(res.body);
        this.flashMaison = res.body;
        this.detailFlashMaisonForm = this.fb.group({
          id: '',
          version: '' ,
          libelle: '',
          description: '',
          prix: '',
          nbreChambre: '',
          nbreSalleEau: '',
          nbreCuisine: '',
          nbreSaleMange: '',
          nbreBuanderie: '',
          nbreTerrasse: '',
          flashMaison: this.fb.group({
            id: this.flashMaison.id,
            version: this.flashMaison.version,
            libelle: this.flashMaison.libelle,
            description: this.flashMaison.description,
            path: this.flashMaison.path,
            numero: this.flashMaison.numero,
            ville: this.flashMaison.ville,
            type: this.flashMaison.type
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
    this.detailImageService.uploadDetailFlashMaison(formData, id).pipe(
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
    let formValue = this.detailFlashMaisonForm.value;
    console.log(formValue);
    let  detailFlashMaison: DetailFlashMaison = {
      libelle: formValue.libelle,
      description: formValue.description,
      prix: formValue.prix,
      nbreChambre: formValue.nbreChambre,
      nbreSalleEau: formValue.nbreSalleEau,
      nbreCuisine: formValue.nbreCuisine,
      nbreSaleMange: formValue.nbreSaleMange,
      nbreBuanderie: formValue.nbreBuanderie,
      nbreTerrasse: formValue.nbreTerrasse,
      flashMaison: {
        id: this.flashMaison.id,
        version: this.flashMaison.version,
        libelle: this.flashMaison.libelle,
        description : this.flashMaison.description,
        path: this.flashMaison.path,
        numero: this.flashMaison.numero,
        ville: this.flashMaison.ville,
        type: this.flashMaison.type
      },
      document: this.document
    };

    this.detailFlashMaisonService.ajoutDetailFlashMaison(detailFlashMaison).subscribe(result => {
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
  greetCat(event) {
    console.log(event.value);
    this.documentService.getDocumentByNom(event.value).subscribe(data => {
      this.document = data.body;
      console.log('Valeur de retour de Document', this.document);

    });
  }
}
