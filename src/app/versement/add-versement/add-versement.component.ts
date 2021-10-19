import { VersementService } from './../../service/versement.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/helper/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-versement',
  templateUrl: './add-versement.component.html',
  styleUrls: ['./add-versement.component.scss']
})
export class AddVersementComponent implements OnInit {
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;

  error = '';

  constructor(public fb: FormBuilder,
              public  versementService: VersementService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddVersementComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {

  }


  // convenience getter for easy access to form fields

  onSubmit(): void{
    if (this.versementService.form.valid) {
    if (!this.versementService.form.get('id').value){
      this.versementService.ajoutVersement(this.versementService.form.value).subscribe(res =>{
      if(res.status === 0){
        this.notificationService.success('Document ajouté avec succès');
      }
      });

      }
    else{
      this.versementService.modifVersement(this.versementService.form.value).subscribe(result => {
        console.log(result.status);
      });
      this.versementService.form.reset();
      this.versementService.initializeFormGroup();
      this.notificationService.success('Document modifié avec succès');
    }
    this.onClose();

  }
  }

  onClose() {
    this.versementService.form.reset();
    this.versementService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.versementService.form.reset();
    this.versementService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }


}
