import { Component, OnInit, Inject } from '@angular/core';
import {  Prospects } from '../../models/Prospect';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProspectService } from 'src/app/service/prospect.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-prospect',
  templateUrl: './modal-prospect.component.html',
  styleUrls: ['./modal-prospect.component.scss']
})
export class ModalProspectComponent implements OnInit {
  prospects: Prospects;
  tForm: FormGroup;
  prospectss: Prospects[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private prospectService: ProspectService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Prospects,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<ModalProspectComponent>) { }

  ngOnInit(): void {
    this.prospectService.getProspectById(this.data['prospects'])
      .subscribe(res => {
        console.log(res.body);
        this.prospects = res.body;
        this.tForm = this.fb.group({
          id: this.prospects.id,
          version: this.prospects.version ,
          nom: this.prospects.nom,
          prenom: this.prospects.prenom,
          email: this.prospects.email,
          telephone: this.prospects.telephone,
          satisfait: this.prospects.satisfait,
          preocupation: this.prospects.preocupation,
        });
      });
  }

  onSubmit() {
    let formValue = this.tForm.value;
    this.prospects = this.tForm.value;
    this.prospectService.modifProspect(this.prospects).subscribe(data => {
      if (data){
        this.prospects = data.body;
        this.dialogRef.close(this.prospects);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['prospect']);

  }
}
