import {Component, Inject, OnInit} from '@angular/core';
import {Client} from '../../models/Client';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
  client: Client;
  clientForm: FormGroup;
  clients: Client[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private clientService: ClientService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Client,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateClientComponent>) { }

  ngOnInit(): void {
    this.clientService.getClientById(this.data['client'])
      .subscribe(res => {
        console.log(res.body);
        this.client = res.body;
        this.clientForm = this.fb.group({
          id: this.client.id,
          version: this.client.version,
          titre: this.client.version,
          nom: this.client.nom,
          prenom: this.client.prenom,
          email: this.client.email,
          numCni: this.client.numCni,
          codePays: this.client.codePays,
          telephone: this.client.telephone,
          password: this.client.password,
          fonction: this.client.fonction,
          nomComplet: this.client.nomComplet,
          adresse: this.fb.group({
            ville: this.client?.adresse?.ville
          }),
          actived: this.client.actived,
          type: this.client.type,

        });
      });
  }

  onSubmit() {
    let formValue = this.clientForm.value;
    this.client = this.clientForm.value;
    this.clientService.modifClient(this.client).subscribe(data => {
      if (data){
        this.client = data.body;
        this.dialogRef.close(this.client);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.clientForm.reset();
  }
}
