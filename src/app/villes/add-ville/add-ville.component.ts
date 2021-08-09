import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ville} from '../../models/combo/Ville';
import {VilleService} from '../../service/ville.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-ville',
  templateUrl: './add-ville.component.html',
  styleUrls: ['./add-ville.component.scss']
})
export class AddVilleComponent implements OnInit {
  villeForm: FormGroup;
  ville: Ville;
  villeId: number;
  error = '';
  private dialogConfig;
  constructor(public fb: FormBuilder,
              private  villeService: VilleService,
              private location: Location,
              private dialogRef: MatDialogRef<AddVilleComponent>,
              private  router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }
  initForm() {
    this.villeForm = this.fb.group({
      libelle: new FormControl('',[Validators.required] ),

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.villeForm.controls[controlName].hasError(errorName);
  }
  public createVille = (createCategorieFormValue) => {
    console.log('voir info', this.villeForm.value);
    if (this.villeForm.valid) {
      this.onSubmit(createCategorieFormValue);
    }
  }

  onSubmit(createVilleFormValue): void{
    console.log('voir les valeurs assignés', createVilleFormValue.value);
    let  ville : Ville = {
      libelle: createVilleFormValue.libelle,

    };

    this.villeService.ajoutVille(ville).subscribe(data => {
        this.ville = data.body;
        console.log(data);
        if (data.status === 0){
          this.dialogRef.close(this.ville);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }else {
          this.error = data.messages[0];
          console.log( data.messages);
        }

      }, error => {
        this.location.back();

      }
    );
    // this.categorieForm.reset();
  }
}
