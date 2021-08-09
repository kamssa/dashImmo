import {Component, Inject, OnInit} from '@angular/core';
import {Maison} from '../../models/Maison';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MaisonService} from '../../service/maison.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-maison',
  templateUrl: './modal-maison.component.html',
  styleUrls: ['./modal-maison.component.scss']
})
export class ModalMaisonComponent implements OnInit {
  maison: Maison;
  mForm: FormGroup;
  terrains: Maison[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private maisonService: MaisonService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Maison,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<ModalMaisonComponent>) { }

  ngOnInit(): void {
    this.maisonService.getMaisonById(this.data['maison'])
      .subscribe(res => {
        console.log(res.body);
        this.maison = res.body;
        this.mForm = this.fb.group({
          id: this.maison.id,
          version: this.maison.version ,
          libelle: this.maison.libelle,
          description: this.maison.description,
         /* prix: this.maison.prix,
          path: this.maison.path,
          latitude: this.maison.latitude,
          longitude: this.maison.longitude,*/
          numero: this.maison.numero,
         /* document: this.maison.document,*/
          ville: this.maison.ville,
        /*  paye: this.maison.paye,
          abonneGeo: this.maison.abonneGeo,
          unite: this.maison.unite,
          note: this.maison.note,
          prixParMettreCarre: this.maison.prixParMettreCarre,
          superficie: this.maison.superficie,*/
          type: this.maison.type
        });
      });
  }

  onSubmit() {
    let formValue = this.mForm.value;
    this.maison = this.mForm.value;
    this.maisonService.modifMaison(this.maison).subscribe(data => {
      if (data){
        this.maison = data.body;
        this.dialogRef.close(this.maison);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.mForm.reset();
  }

}
