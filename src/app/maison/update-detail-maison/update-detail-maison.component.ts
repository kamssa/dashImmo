import {Component, Inject, OnInit} from '@angular/core';
import {DetailTerrain} from '../../models/DetailTerrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Document} from '../../models/Document';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {DocumentService} from '../../service/document.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DetailMaisonService} from '../../service/detail-maison.service';
import {DetailMaison} from '../../models/DetailMaison';

@Component({
  selector: 'app-update-detail-maison',
  templateUrl: './update-detail-maison.component.html',
  styleUrls: ['./update-detail-maison.component.scss']
})
export class UpdateDetailMaisonComponent implements OnInit {
  detailMaison: DetailMaison;
  tdForm: FormGroup;
  detailTerrains: DetailTerrain[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  documents: Document[];
  document: Document;
  constructor( private detailMaisonService: DetailMaisonService,
               private documentService: DocumentService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: DetailTerrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateDetailMaisonComponent>) { }

  ngOnInit(): void {
    this.documentService.getAllDocument().subscribe(data => {
      console.log(data);
      this.documents = data.body;
    });
    this.detailMaisonService.getDetailMaisonById(this.data['detailMaison'])
      .subscribe(res => {
        console.log(res.body);
        this.detailMaison = res.body;
        this.tdForm = this.fb.group({
          id: this.detailMaison.id,
          version: this.detailMaison.version ,
          libelle: this.detailMaison.libelle,
          description: this.detailMaison.description,
          prix: this.detailMaison.prix,
          nbreSalleEau: this.detailMaison.nbreSalleEau,
          nbreCuisine: this.detailMaison.nbreCuisine,
          nbreSaleMange: this.detailMaison.nbreSaleMange,
          nbreBuanderie: this.detailMaison.nbreBuanderie,
          nbreTerrasse: this.detailMaison.nbreTerrasse,
          maison: this.detailMaison.maison,
          document: this.fb.group({
            libelle: this.detailMaison?.document?.libelle
          }),

        });
      });
  }

  onSubmit() {
    let formValue = this.tdForm.value;
    this.detailMaison = this.tdForm.value;
    console.log(this.detailMaison);
    this.detailMaisonService.modifDetailMaison(this.detailMaison).subscribe(data => {
      if (data){
        console.log(data.body);
        this.detailMaison = data.body;
        this.dialogRef.close(this.detailMaison);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['listMaison']);

  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  greetDocument(event) {

    console.log('Voir le select', event.value);
    this.documentService.getDocumentByNom(event.value).subscribe(data => {
      this.document = data.body;
      console.log('valeur de retour de ville', this.document);
    });

  }
}
