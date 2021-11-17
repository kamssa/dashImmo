import { TerrainVendu } from './../../models/TerrainVendu';
import { Component, OnInit, Inject } from '@angular/core';
import {Personne} from '../../models/Personne';
import {FormBuilder} from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';

import { TerrainVenduService } from '../../service/terrain-vendu.service';
import { NotificationService } from '../../helper/notification.service';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  isLinear = false;
  checked = false;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  terrainVendu: TerrainVendu;
  personnes: Personne[];
  personne: Personne;

  constructor(public fb: FormBuilder,
              public  terrainVenduService: TerrainVenduService,
              private notificationService: NotificationService,
              private clientService: ClientService,
              public dialogRef: MatDialogRef<AddProduitComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {
    this.clientService.getAllClient().subscribe(data => {
      console.log(data.body);
      this.personnes = data.body;
      console.log(this.personnes);
    });
  }



  onSubmit(): void{

    if (!this.terrainVenduService.form.get('id').value){
        this.terrainVendu = {
          id: null,
          version:  null,
          libelle: this.terrainVenduService.form.value.libelle,
            paye: this.terrainVenduService.form.value.paye,
            abonneGeo: this.terrainVenduService.form.value.abonneGeo,
            superficie: this.terrainVenduService.form.value.superficie,
            description: this.terrainVenduService.form.value.description,
            latitude: this.terrainVenduService.form.value.latitude,
            longitude: this.terrainVenduService.form.value.longitude,
            prix: this.terrainVenduService.form.value.prix,
            nomVille: this.terrainVenduService.form.value.nomVille,
            typeDocument: this.terrainVenduService.form.value.typeDocument,
            personne: this.personne


      };
     console.log('Voir les valeur du formulaire', this.terrainVendu);
       this.terrainVenduService.ajoutTerrainVendur(this.terrainVendu).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Terrain ajouté avec succès');
        }
        });
     }else{
         this.terrainVendu = {
          id:  this.terrainVenduService.form.value.id,
          version:  this.terrainVenduService.form.value.version,
          libelle: this.terrainVenduService.form.value.libelle,
            paye: this.terrainVenduService.form.value.paye,
            abonneGeo: this.terrainVenduService.form.value.abonneGeo,
            superficie: this.terrainVenduService.form.value.superficie,
            description: this.terrainVenduService.form.value.description,
            latitude: this.terrainVenduService.form.value.latitude,
            longitude: this.terrainVenduService.form.value.longitude,
            prix: this.terrainVenduService.form.value.prix,
            nomVille: this.terrainVenduService.form.value.nomVille,
            typeDocument: this.terrainVenduService.form.value.typeDocument,
            personne: this.personne

         };
         console.log('Voir le client', this.terrainVendu);
         this.terrainVenduService.modifTerrainVendu(this.terrainVendu).subscribe(result => {
           console.log(result.status);
           if(result.status=== 0){
             this.notificationService.success('Terrain modifié avec succès');
           }
         });

      this.terrainVenduService.form.reset();
      this.terrainVenduService.initializeFormGroup();
       }


      this.onClose();
    }

 onClose() {
    this.terrainVenduService.form.reset();
    this.terrainVenduService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.terrainVenduService.form.reset();
    this.terrainVenduService.initializeFormGroup();
      this.notificationService.success('Champs réinitialisés!');
  }
  onCountryChange(event: any) {
    console.log(event);
    this.code = event.dialCode;
    console.log(this.code);
  }


  telInputObject(obj) {
   this.initialCode = obj.s.dialCode
    console.log(this.initialCode);
  }
  greetPersonne(event) {
    console.log(event.value);
    this.clientService.getClientById(event.value).subscribe(data => {
      this.personne = data.body;
      console.log('Valeur de retour de terrain', this.personne);

    });
  }
}
