import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Document} from '../../models/Document';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Terrain} from '../../models/Terrain';
import {Ville} from '../../models/combo/Ville';
import {TerrainService} from '../../service/terrain.service';
import {NotificationService} from '../../helper/notification.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DocumentService} from '../../service/document.service';
import {VilleService} from '../../service/ville.service';
import {FlashTerrainService} from '../../service/flash-terrain.service';
import {FlashTerrain} from '../../models/FlashTerrain';
interface TypeVente {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-flash-terrain',
  templateUrl: './add-flash-terrain.component.html',
  styleUrls: ['./add-flash-terrain.component.scss']
})
export class AddFlashTerrainComponent implements OnInit {

  isLinear = false;
  checked = false;
  clientForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  checkbox = false;
  flashTerrain: FlashTerrain;
  type: TypeVente[] = [
    {value: 'aucun', viewValue: 'Aucun'},
    {value: 'venteFlash', viewValue: 'Vente Flash'},
  ];
  selectedValue: string;
  ville: Ville;
  villes: Ville[];
  document: Document;
  documents: Document[];
  constructor(public fb: FormBuilder,
              public  flashTerrainService: FlashTerrainService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddFlashTerrainComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              private documentService: DocumentService,
              private villeService: VilleService
  ) { }

  ngOnInit(): void {
    this.villeService.getAllVille().subscribe(data => {
      this.villes = data.body;
    });
    this.documentService.getAllDocument().subscribe(data => {
      this.documents = data.body;
    });

  }


  // convenience getter for easy access to form fields

  onSubmit(): void{
    console.log('Voir les valeur du formulaire', this.flashTerrainService.form.value);
    if (!this.flashTerrainService.form.get('id').value){
      this.flashTerrain = {
        libelle: this.flashTerrainService.form.value.libelle,
        surfaceUtile: this.flashTerrainService.form.value.surfaceUtile,
        surfaceTerrain: this.flashTerrainService.form.value.surfaceTerrain,
        situationGeographique: this.flashTerrainService.form.value.situationGeographique,
        flashmaisonType: this.flashTerrainService.form.value.flashmaisonType,
        description: this.flashTerrainService.form.value.description,
        numero: this.flashTerrainService.form.value.numero,
        prix: this.flashTerrainService.form.value.prix,
        ville: this.ville,
        document: this.document,
        type: 'FT'
      };
      console.log('Voir le flash terrain', this.flashTerrain);
      this.flashTerrainService.ajoutFlashTerrain(this.flashTerrain).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Terrain ajouté avec succès');
          this.flashTerrain = res.body;
        }
      });

    } else {
      this.flashTerrain = {
        id:  this.flashTerrainService.form.value.id,
        version:  this.flashTerrainService.form.value.version,
        libelle: this.flashTerrainService.form.value.libelle,
        surfaceUtile: this.flashTerrainService.form.value.surfaceUtile,
        surfaceTerrain: this.flashTerrainService.form.value.surfaceTerrain,
        situationGeographique: this.flashTerrainService.form.value.situationGeographique,
        flashmaisonType: this.flashTerrainService.form.value.flashmaisonType,
        description: this.flashTerrainService.form.value.description,
        numero: this.flashTerrainService.form.value.numero,
        prix: this.flashTerrainService.form.value.prix,
        ville: this.flashTerrainService.form.value.ville,
        document: this.flashTerrainService.form.value.document,
        type: this.flashTerrainService.form.value.type
      };
      this.flashTerrainService.modifTerrainFlashTerrain(this.flashTerrain).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.flashTerrain = result.body;
          this.notificationService.success('Terrain modifié avec succès');
        }
      });
      this.flashTerrainService.form.reset();
      this.flashTerrainService.initializeFormGroup();
    }


    // this.onClose();

  }
  onClose() {
    this.flashTerrainService.form.reset();
    this.flashTerrainService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.flashTerrainService.form.reset();
    this.flashTerrainService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
  getVille(event) {
    console.log(event.value);
    this.villeService.getVilleById(event.value).subscribe(data => {
      this.ville = data.body;
      console.log('Valeur de retour de ville', this.ville);

    });
  }
  getDocument(event) {
    console.log(event.value);
    this.documentService.getDocumentById(event.value).subscribe(data => {
      this.document = data.body;
      console.log('Valeur de retour de document', this.document);

    });
  }

}
