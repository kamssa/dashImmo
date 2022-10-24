import { Component, OnInit, Inject } from '@angular/core';



@Component({
  selector: 'app-add-produit-ageo',
  templateUrl: './add-produit-ageo.component.html',
  styleUrls: ['./add-produit-ageo.component.scss']
})
export class AddProduitAGeoComponent{
/* checked = false;
   horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  checkbox = false;
  terrainvendu: TerrainVendu;
  personne: any;
  constructor(
             private terrainVenduService: TerrainVenduService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddProduitAGeoComponent>,
              private  router: Router, private _snackBar: MatSnackBar) { }




  ngOnInit(): void {

  }

  onSubmit(): void{
   // console.log('Voir les valeur du formulaire', this.clientService.form.value);

    if (!this.terrainVenduService.form.get('id').value){
        this.terrainvendu = {
        numero: this.terrainVenduService.form.value.numero,
        personne: {
         nom: this.terrainVenduService.form.value.personne.nom,
        prenom: this.terrainVenduService.form.value.personne.prenom,
        email: this.terrainVenduService.form.value.personne.email,
        telephone: this.terrainVenduService.form.value.personne.telephone,
          }

        };
      console.log('Voir les valeur du formulaire', this.terrainvendu);
       this.terrainVenduService.ajoutTerrainVendur(this.terrainvendu).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Employé ajouté avec succès');
        }
        });

       }else{
         this.terrainvendu = {
        id: this.terrainVenduService.form.value.id,
        version: this.terrainVenduService.form.value.version,
        numero: this.terrainVenduService.form.value.numero
         personne: {
         nom: this.terrainVenduService.form.value.personne.nom,
        prenom: this.terrainVenduService.form.value.personne.prenom,
        email: this.terrainVenduService.form.value.personne.email,
        telephone: this.terrainVenduService.form.value.personne.telephone,
          }
        };
         console.log('Voir Employé', this.terrainvendu);
      this.terrainVenduService.modifTerrainVendu(this.terrainvendu).subscribe(result => {
        console.log(result.status);
        if(result.status=== 0){
          this.notificationService.success('Employé modifié avec succès');
        }
      });
      this.terrainVenduService.form.reset();
      this.terrainVenduService.initializeFormGroup();

       }

     this.onClose();

}

  onClose() {
    this.terrainVenduService.form.reset();
    this.terrainVenduService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.terrainVenduService.form.reset();
    this.terrainVenduService.initializeFormGroup();
      this.notificationService.success('Champs réinitialisés!');
  }

 greetDepartement(ev){

 }

  greetDepartements(ev){

 } */
}
