import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DetailImageService} from '../../service/detail-image.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';
import {Maison} from '../../models/Maison';
import {DetailMaisonService} from '../../service/detail-maison.service';
import {MaisonService} from '../../service/maison.service';
import {DocumentService} from '../../service/document.service';
import {Document} from '../../models/Document';
import {DetailMaison} from '../../models/DetailMaison';

@Component({
  selector: 'app-detail-maison',
  templateUrl: './detail-maison.component.html',
  styleUrls: ['./detail-maison.component.scss']
})
export class DetailMaisonComponent implements OnInit {
  detailMaisonForm: FormGroup;
  maison: Maison;
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
  constructor( private maisonService: MaisonService,
               private documentService: DocumentService,
               private detailMaisonService: DetailMaisonService,
               private detailImageService: DetailImageService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Maison,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<DetailMaisonComponent>) { }

  ngOnInit(): void {
    this.documentService.getAllDocument()
      .subscribe(res => {
        this.documents = res.body;
      });
    this.maisonService.getMaisonById(this.data['maison'])
      .subscribe(res => {
        console.log(res.body);
        this.maison = res.body;
        this.detailMaisonForm = this.fb.group({
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
           maison: this.fb.group({
            id: this.maison.id,
            version: this.maison.version,
            nom: this.maison.libelle,
            description: this.maison.description,
            path: this.maison.path,
            numero: this.maison.numero,
            ville: this.maison.ville,
            type: this.maison.type
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
    this.detailImageService.uploadDetailMaison(formData, id).pipe(
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
    let formValue = this.detailMaisonForm.value;
    console.log(formValue);
    let  detailMaison: DetailMaison = {
      libelle: formValue.libelle,
      description: formValue.description,
      prix: formValue.prix,
      nbreChambre: formValue.nbreChambre,
      nbreSalleEau: formValue.nbreSalleEau,
      nbreCuisine: formValue.nbreCuisine,
      nbreSaleMange: formValue.nbreSaleMange,
      nbreBuanderie: formValue.nbreBuanderie,
      nbreTerrasse: formValue.nbreTerrasse,
      maison: {
        id: this.maison.id,
        version: this.maison.version,
        libelle: this.maison.libelle,
        description : this.maison.description,
        path: this.maison.path,
        numero: this.maison.numero,
        ville: this.maison.ville,
        type: this.maison.type
      },
      document: this.document
    };

    this.detailMaisonService.ajoutDetailMaison(detailMaison).subscribe(result => {
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
