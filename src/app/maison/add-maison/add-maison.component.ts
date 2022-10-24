import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-maison',
  templateUrl: './add-maison.component.html',
  styleUrls: ['./add-maison.component.scss']
})
export class AddMaisonComponent {

 /* isLinear = false;
  checked = false;
   clientForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  checkbox = false;
  prospects: Prospects;
  constructor(public fb: FormBuilder,
              public  prospectService: ProspectService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddProspectComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }

  ngOnInit(): void {
  }


  // convenience getter for easy access to form fields

  onSubmit(): void{
   // console.log('Voir les valeur du formulaire', this.clientService.form.value);

    if (!this.prospectService.form.get('id').value){
        this.prospects = {
        nom: this.prospectService.form.value.nom,
        prenom: this.prospectService.form.value.prenom,
        email: this.prospectService.form.value.email,
        codePays: '225',
        telephone: this.prospectService.form.value.telephone,
        fonction: this.prospectService.form.value.fonction,
         satisfait: false,
         preocupation: this.prospectService.form.value.preocupation,
        };
       this.prospectService.ajoutProspect(this.prospects).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Prospect ajouté avec succès');
        }
        });

     } else {
        this.prospects = {
          id:  this.prospectService.form.value.id,
          version:  this.prospectService.form.value.version,
           nom: this.prospectService.form.value.nom,
           prenom: this.prospectService.form.value.prenom,
           email: this.prospectService.form.value.email,
           codePays: this.code,
           telephone: this.prospectService.form.value.telephone,
           fonction: this.prospectService.form.value.fonction,
           satisfait: this.prospectService.form.value.satisfait,
           preocupation: this.prospectService.form.value.preocupation,

         };
         this.prospectService.modifProspect(this.prospects).subscribe(result => {
          console.log(result.status);
          if(result.status=== 0){
            this.notificationService.success('Prospect modifié avec succès');
          }
        });
        console.log('Voir le prospect', this.prospects);

        this.prospectService.form.reset();
        this.prospectService.initializeFormGroup();
       }


      this.onClose();

    }



  onClose() {
    this.prospectService.form.reset();
    this.prospectService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.prospectService.form.reset();
    this.prospectService.initializeFormGroup();
      this.notificationService.success('Champs réinitialisés!');
  }
  onCountryChange(event: any) {
    console.log(event);
    this.code = event.dialCode;
    console.log(this.code);
  }


  telInputObject(obj) {
   this.initialCode = obj.s.dialCode
    console.log(this.initialCode);
  }

*/
}
