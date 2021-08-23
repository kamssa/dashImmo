import { Component, OnInit } from '@angular/core';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {Personne} from '../../models/Personne';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';
import {ClientService} from '../../service/client.service';
import {PersonneService} from '../../service/personne.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {DetailTerrain} from '../../models/DetailTerrain';
import {TerrainVendu} from '../../models/TerrainVendu';
import {TerrainVenduService} from '../../service/terrain-vendu.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  achatForm: FormGroup;
  terrainAcheter: TerrainAcheter;
  terrainVendu: TerrainVendu;
  detailTerrain: DetailTerrain;
  personnes: Personne[];
  personne: Personne;
  checked: false;
  checkedGeo: false;
  private dialogConfig;
  abonneGeo = false;

  constructor(public fb: FormBuilder,
              private  terrainVenduService: TerrainVenduService,
              private detailTerrainService: DetailTerrainService,
              private clientService: ClientService,
              private personneService: PersonneService,
              private location: Location,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<AddProduitComponent>,
              private  router: Router) { }

  ngOnInit(): void {

    this.clientService.getAllClient().subscribe(data => {
      console.log(data.body);
      this.personnes = data.body;
    });
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }
  initForm() {
    this.achatForm = this.fb.group({
      libelle: [''],
      paye: [''],
      abonneGeo: [''],
      unite: [''],
      note: [''],
      prixParMettreCarre: [''],
      superficie: [''],
      surfaceUtilise: [''],
      description: [''],
      latitude: [''],
      longitude: [''],
      numero: [''],
      prix: [''],
      path: [''],
      nomVille: [''],
      typeDocument: [''],
      personne: this.fb.group({
        nomComplet: '',
      })

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.achatForm.controls[controlName].hasError(errorName);
  }
  public createAchat = (createAchatFormValue) => {

    if (this.achatForm.valid) {
      this.onSubmit(createAchatFormValue);
    }
  }
  onSubmit(createAchatFormValue): void{
    let formValue = this.achatForm.value;
    let  terrainVendu : TerrainVendu = {
      id: null,
      version: null,
      libelle: formValue.libelle,
      paye: formValue.paye,
      abonneGeo: formValue.abonneGeo,
      superficie: formValue.superficie,
      description: formValue.description,
      latitude: formValue.latitude,
      longitude: formValue.longitude,
      prix: formValue.prix,
      nomVille: formValue.nomVille,
      typeDocument: formValue.typeDocument,
      personne: this.personne
    };
    console.log('terrain acheter', terrainVendu);
    this.terrainVenduService.ajoutTerrainVendur(terrainVendu).subscribe(data => {
        console.log('valeu de retour de terrain achete', data.body);
        this.terrainAcheter = data.body;
        this.dialogRef.close();

      }, error => {
        this.location.back();

      }
    );
    this.router.navigate(['/terrainVendu']);
  }

  greetPersonne(event) {
    console.log(event.value);
    this.clientService.getClientById(event.value).subscribe(data => {
      this.personne = data.body;
      console.log('Valeur de retour de terrain', this.personne);

    });
  }

}
