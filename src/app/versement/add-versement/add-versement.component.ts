import { ClientService } from './../../service/client.service';
import { Component, OnInit, Inject, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/helper/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Versement } from '../../models/Versement';
import { Personne } from 'src/app/models/Personne';
import { TerrainVenduService } from '../../service/terrain-vendu.service';
import { TerrainVendu } from 'src/app/models/TerrainVendu';
import { DetailVersement } from '../../models/DetailVersement';
import { DVersementService } from '../../service/dversement.service';

@Component({
  selector: 'app-add-versement',
  templateUrl: './add-versement.component.html',
  styleUrls: ['./add-versement.component.scss']
})
export class AddVersementComponent implements OnInit, AfterViewInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  dVersementForm: FormGroup;
  error = '';
  roomsFilter: any;
  personne: Personne;
  dversements: DetailVersement[];
  dversement: DetailVersement;
  solde: number;
  reste: number;
  terrainVendus: TerrainVendu[];
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(public fb: FormBuilder,
              public  dversementService: DVersementService,
              private clientService: ClientService,
              private terrainVenduService: TerrainVenduService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddVersementComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Personne
              ) { }

ngOnInit(): void {
    this.clientService.getClientById(this.data['client'])
    .subscribe(res => {
    console.log('Voir le client', res.body);
    this.personne = res.body;
    });
    this.dversementService.getDVersementByIdClient(this.data['client'])
    .subscribe(data => {
     console.log(data.body);
     this.dversements = data.body;
    });
    this.terrainVenduService.getTerrainVenduByIdPersonne(this.data['client'])
    .subscribe(data => {
     this.terrainVendus = data.body;
    });

  this.initForm();
  }
ngAfterViewInit(){
  this.terrainVenduService.getTerrainVenduByIdPersonne(this.data['client'])
  .subscribe(data => {
   this.terrainVendus = data.body;
  });
}
  initForm(): void{

    this.dVersementForm = this.fb.group({
      id: new FormControl(null),
      date: ['', Validators.required],
      libelle:'',
      montantVerse: ['', Validators.required]
      });
  }
  // convenience getter for easy access to form fields

  onSubmit(): void{
    console.log(this.dVersementForm.value);
    let formValue = this.dVersementForm.value;
    let  dversement : DetailVersement = {
          id: null,
          version: null,
          date: formValue.date,
          libelle: formValue.libelle,
          montantVerse: formValue.montantVerse,
          personne: this.personne

        };
        console.log('versement', dversement);
        this.dversementService.ajoutDVersement(dversement)
        .subscribe(res => {
          console.log('opération effectuée');
          this.dversement = res.body;

        });
         this.dversementService.dVerementCreer$.subscribe(test => {
           console.log('Voir le subject dans le add versement',test);
         });

          this.onClose();


}

  onClose() {
this.dialogRef.close();
  }

  onClear() {
    this.dVersementForm.reset();
    //this.dVersementForm.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
}
