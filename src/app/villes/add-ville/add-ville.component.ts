import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ville} from '../../models/combo/Ville';
import {VilleService} from '../../service/ville.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {Document} from '../../models/Document';
import {MyErrorStateMatcher} from '../../helper/MyErrorStateMatcher';
import {DocumentService} from '../../service/document.service';
import {NotificationService} from '../../helper/notification.service';

@Component({
  selector: 'app-add-ville',
  templateUrl: './add-ville.component.html',
  styleUrls: ['./add-ville.component.scss']
})
export class AddVilleComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;
  matcher = new MyErrorStateMatcher();
  libelle = new FormControl('',
    [Validators.required] );
  description = new FormControl('');
  error = '';

  constructor(public fb: FormBuilder,
              public  villeService: VilleService,
              private location: Location,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddVilleComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Ville) { }




  ngOnInit(): void {

  }


  // convenience getter for easy access to form fields

  onSubmit(): void{
    if (this.villeService.form.valid) {
      if (!this.villeService.form.get('id').value){
        this.villeService.ajoutVille(this.villeService.form.value).subscribe(res =>{
          if(res.status === 0){
            this.notificationService.success('Ville ajoutée avec succès');
          }
        });

      }
      else{
        this.villeService.modifVille(this.villeService.form.value).subscribe(result => {
          console.log(result.status);
        });
        this.villeService.form.reset();
        this.villeService.initializeFormGroup();
        this.notificationService.success('Ville modifié avec succès');
      }
      this.onClose();

    }
  }

  onClose() {
    this.villeService.form.reset();
    this.villeService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.villeService.form.reset();
    this.villeService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
}
