import { Component, OnInit } from '@angular/core';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {Produit} from '../../models/Produit';
import {Personne} from '../../models/Personne';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';
import {ProduitService} from '../../service/produit.service';
import {ClientService} from '../../service/client.service';
import {PersonneService} from '../../service/personne.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {DetailTerrainService} from '../../service/detail-terrain.service';
import {DetailTerrain} from '../../models/DetailTerrain';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  achatForm: FormGroup;
  terrainAcheter: TerrainAcheter;
  terrainAchatId: number;
  detailTerrains: DetailTerrain[];
  detailTerrain: DetailTerrain;
  personnes: Personne[];
  personne: Personne;

  private dialogConfig;
  constructor(public fb: FormBuilder,
              private  terrainAcheterService: TerrainAcheterService,
              private detailTerrainService: DetailTerrainService,
              private clientService: ClientService,
              private personneService: PersonneService,
              private location: Location,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<AddProduitComponent>,
              private  router: Router) { }

  ngOnInit(): void {
    this.detailTerrainService.getAllDetailTerrain().subscribe(data => {
      this.detailTerrains = data.body;
    });
    this.personneService.getAllPersonne().subscribe(data => {
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

      detailTerrain: this.fb.group({
        libelle: ''
      }),
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
    let  terrainAcheter : TerrainAcheter = {
      detailTerrain: this.detailTerrain,
      personne: this.personne
    };
    console.log('terrain acheter', terrainAcheter);
    this.terrainAcheterService.ajoutTerrainAcheter(terrainAcheter).subscribe(data => {
        console.log('valeu de retour de terrain achete', data.body);
        this.terrainAcheter = data.body;
        this.dialogRef.close();

      }, error => {
        this.location.back();

      }
    );
    this.router.navigate(['/terrainVendu']);
  }

  greetProduit(event) {
    console.log(event.value);
    this.detailTerrainService.getDetailTerrainById(event.value).subscribe(data => {
      this.detailTerrain = data.body;
      console.log('Valeur de retour de terrain', this.detailTerrain);

    });
  }

  greetPersonne(event) {
    console.log(event.value);
    this.clientService.getClientById(event.value).subscribe(data => {
      this.personne = data.body;
      console.log('Valeur de retour de terrain', this.personne);

    });
  }

}
