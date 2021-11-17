import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Personne } from '../../models/Personne';
import { DetailVersement } from '../../models/DetailVersement';
import { TerrainVendu } from 'src/app/models/TerrainVendu';
import { DVersementService } from 'src/app/service/dversement.service';
import { NotificationService } from 'src/app/helper/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-versement',
  templateUrl: './update-versement.component.html',
  styleUrls: ['./update-versement.component.scss']
})
export class UpdateVersementComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  dVForm: FormGroup;
  error = '';
  roomsFilter: any;
  personne: Personne;
  dversements: DetailVersement[];
  dversement: DetailVersement;
  solde: number;
  reste: number;
  terrainVendus: TerrainVendu[];
  constructor(public fb: FormBuilder,
              public  dversementService: DVersementService,

              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<UpdateVersementComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DetailVersement
              ) { }

ngOnInit(): void {

 this.dversementService.getDVersementById(this.data['detailVersement'])
      .subscribe(res => {
        console.log(res.body);
        this.dversement = res.body;
        this.dVForm = this.fb.group({
          id: this.dversement.id,
          version: this.dversement.version,
          date: this.dversement.date,
          libelle: this.dversement.libelle,
          montantVerse: this.dversement.montantVerse,
          versement: this.dversement.versement,
          personne: this.dversement.personne,
          employe: this.dversement.employe
          });
      });

}
ngAfterViewInit(){


}


  onSubmit(): void{
    let formValue = this.dVForm.value;
    this.dversement = this.dVForm.value;
    console.log(this.dversement);
    this.dversementService.modifDVersement(this.dversement).subscribe(data => {
      if (data.status===0 ){
        console.log(data.body);
        this.dversement = data.body;


        this._snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,

        });


      }else{
        console.log('opération non efectuée');
      }
    });
    this.router.navigate(['versement']);
          this.onClose();


}

  onClose() {
this.dialogRef.close();
  }

  onClear() {
    this.dVForm.reset();
    //this.dVersementForm.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
}
