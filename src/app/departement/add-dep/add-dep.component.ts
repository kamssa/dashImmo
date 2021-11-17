import { Component, Inject, OnInit } from '@angular/core';
import {Departement} from '../../models/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MyErrorStateMatcher} from '../../helper/MyErrorStateMatcher';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartementService} from '../../service/dep.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {NotificationService} from '../../helper/notification.service';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.scss']
})
export class AddDepComponent implements OnInit {
  depForm: FormGroup;
  departement: Departement;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;

  error = '';

  constructor(public fb: FormBuilder,
              public departementService: DepartementService,
              private location: Location,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddDepComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {
   

  }

onSubmit(): void{
    if (this.departementService.form.valid) {
    if (!this.departementService.form.get('id').value){
      this.departementService.ajoutDepartement(this.departementService.form.value).subscribe(res =>{
      if(res.status === 0){
        this.notificationService.success('Departement ajouté avec succès');
      }
      });

      }
    else{
      this.departementService.modifDepartement(this.departementService.form.value).subscribe(result => {
        console.log(result.status);
      });
      this.departementService.form.reset();
      this.departementService.initializeFormGroup();
      this.notificationService.success('Document modifié avec succès');
    }
    this.onClose();

  }
  }

  onClose() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }

}
