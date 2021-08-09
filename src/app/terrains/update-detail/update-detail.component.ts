import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Ville} from '../../models/combo/Ville';
import {TerrainService} from '../../service/terrain.service';
import {VilleService} from '../../service/ville.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DetailTerrain} from '../../models/DetailTerrain';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {DocumentService} from '../../service/document.service';
import {Document} from '../../models/Document';

@Component({
  selector: 'app-update-detail',
  templateUrl: './update-detail.component.html',
  styleUrls: ['./update-detail.component.scss']
})
export class UpdateDetailComponent implements OnInit {
  detailTerrain: DetailTerrain;
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
  constructor( private detailTerrainService: DetailTerrainService,
               private documentService: DocumentService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: DetailTerrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateDetailComponent>) { }

  ngOnInit(): void {
    this.documentService.getAllDocument().subscribe(data => {
      console.log(data);
      this.documents = data.body;
    });
    this.detailTerrainService.getDetailTerrainById(this.data['detailTerrain'])
      .subscribe(res => {
        console.log(res.body);
        this.detailTerrain = res.body;
        this.tdForm = this.fb.group({
          id: this.detailTerrain.id,
          version: this.detailTerrain.version ,
            libelle: this.detailTerrain.libelle,
           paye: this.detailTerrain.paye,
           abonneGeo: this.detailTerrain.abonneGeo,
            unite: this.detailTerrain.unite,
           note: this.detailTerrain.note,
           prixParMettreCarre: this.detailTerrain.prixParMettreCarre,
           superficie: this.detailTerrain.superficie,
           surfaceUtilise: this.detailTerrain.surfaceUtilise,
           description: this.detailTerrain.description,
           latitude: this.detailTerrain.latitude,
           longitude: this.detailTerrain.longitude,
           numero: this.detailTerrain.numero,
           prix: this.detailTerrain.prix,
           terrain: this.fb.group({
             libelle: this.detailTerrain?.terrain?.libelle
           }),
          document: this.fb.group({
            libelle: this.detailTerrain?.document?.libelle
          }),

        });
      });
  }

  onSubmit() {
    let formValue = this.tdForm.value;
    this.detailTerrain = this.tdForm.value;
    console.log(this.detailTerrain);
    this.detailTerrainService.modifDetailTerrain(this.detailTerrain).subscribe(data => {
      if (data){
        console.log(data.body);
        this.detailTerrain = data.body;
        this.dialogRef.close(this.detailTerrain);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['listTerrains']);

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
