import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Document } from '../../models/Document';
import { Terrain } from '../../models/Terrain';
import { TerrainService } from '../../service/terrain.service';
import { NotificationService } from '../../helper/notification.service';
import { DocumentService } from '../../service/document.service';
import { VilleService } from '../../service/ville.service';
import { Ville } from '../../models/combo/Ville';

interface TypeVente {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-terrains',
  templateUrl: './add-terrains.component.html',
  styleUrls: ['./add-terrains.component.scss']
})
export class AddTerrainsComponent  implements OnInit{


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
  terrain: Terrain;
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
              public  terrainService: TerrainService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddTerrainsComponent>,
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
    console.log('Voir les valeur du formulaire', this.terrainService.form.value);
    if (!this.terrainService.form.get('id').value){
      this.terrain = {
        libelle: this.terrainService.form.value.libelle,
        note: this.terrainService.form.value.note,
        prixParMettreCarre: this.terrainService.form.value.prixParMettreCarre,
        superficie: this.terrainService.form.value.superficie,
        surfaceUtilise: this.terrainService.form.value.surfaceUtilise,
        description: this.terrainService.form.value.description,
        numero: this.terrainService.form.value.numero,
        prix: this.terrainService.form.value.prix,
        typeVente: this.selectedValue,
        ville: this.ville,
        document: this.document,
        type: 'TE'
      };
      console.log('Voir le terrain', this.terrain);
      this.terrainService.ajoutTerrain(this.terrain).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Terrain ajouté avec succès');
          this.terrain = res.body;
        }
      });

    } else {
      this.terrain = {
        id:  this.terrainService.form.value.id,
        version:  this.terrainService.form.value.version,
        libelle: this.terrainService.form.value.libelle,
        note: this.terrainService.form.value.note,
        prixParMettreCarre: this.terrainService.form.value.prixParMettreCarre,
        superficie: this.terrainService.form.value.superficie,
        surfaceUtilise: this.terrainService.form.value.surfaceUtilise,
        description: this.terrainService.form.value.description,
        numero: this.terrainService.form.value.numero,
        prix: this.terrainService.form.value.prix,
        typeVente: this.terrainService.form.value.typeVente,
        ville: this.terrainService.form.value.ville,
        document: this.terrainService.form.value.document,
        type: this.terrainService.form.value.type,
      };
      this.terrainService.modifTerrain(this.terrain).subscribe(result => {
        console.log(result.status);
        if(result.status=== 0){
          this.terrain = result.body;
          this.notificationService.success('Terrain modifié avec succès');
        }
      });
      this.terrainService.form.reset();
      this.terrainService.initializeFormGroup();
    }


    // this.onClose();

  }
  onClose() {
    this.terrainService.form.reset();
    this.terrainService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.terrainService.form.reset();
    this.terrainService.initializeFormGroup();
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
  }}
