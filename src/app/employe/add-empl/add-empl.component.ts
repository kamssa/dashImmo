import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/helper/notification.service';
import { Employe } from '../../models/Employe';
import { EmployeService } from '../../service/employe.service';
import { DepartementService } from '../../service/dep.service';
import { Departement } from '../../models/Departement';


@Component({
  selector: 'app-add-empl',
  templateUrl: './add-empl.component.html',
  styleUrls: ['./add-empl.component.scss']
})
export class AddEmplComponent implements OnInit {
  checked = false;
   clientForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  checkbox = false;
  employe: Employe;
  departements: Departement[];
  departement: Departement;
  constructor(public fb: FormBuilder,
              public  employeService: EmployeService,
              private departementService: DepartementService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddEmplComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {
      this.departementService.getAllDepartement().subscribe(data => {
      console.log('Voir les dep',data);
      this.departements = data.body;
    });
  }

  onSubmit(): void{
   // console.log('Voir les valeur du formulaire', this.clientService.form.value);

    if (!this.employeService.form.get('id').value){
        this.employe = {
        nom: this.employeService.form.value.nom,
        prenom: this.employeService.form.value.prenom,
        email: this.employeService.form.value.email,
        telephone: this.employeService.form.value.telephone,
        password: this.employeService.form.value.password,
        desactiver: false,
        type:'EM',
        departement: this.departement
      };
      console.log('Voir les valeur du formulaire', this.employe);
       this.employeService.ajoutEmploye(this.employe).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Employé ajouté avec succès');
        }
        }); 

       }else{
         this.employe = {
          id:  this.employeService.form.value.id,
          version:  this.employeService.form.value.version,
           nom: this.employeService.form.value.nom,
           prenom: this.employeService.form.value.prenom,
           email: this.employeService.form.value.email,
           telephone: this.employeService.form.value.telephone,
           password: this.employeService.form.value.password,
           desactiver: this.employeService.form.value.desactiver,
           type: 'EM',
           departement: this.departement
         };
         console.log('Voir Employé', this.employe);
      this.employeService.modifEmploye(this.employe).subscribe(result => {
        console.log(result.status);
        if(result.status=== 0){
          this.notificationService.success('Employé modifié avec succès');
        }
      });
      this.employeService.form.reset();
      this.employeService.initializeFormGroup();

       }

     this.onClose();

}

  onClose() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
      this.notificationService.success('Champs réinitialisés!');
  }
 
  greetDepartement(event) {

    console.log('Voir le select', event.value);
    this.departementService.getDepartementById(event.value).subscribe(data => {
      this.departement = data.body;
      console.log('valeur de retour de departement', this.departement);
    });

  }
}
