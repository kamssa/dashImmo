import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Ville} from '../models/combo/Ville';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    libelle: new FormControl('', [Validators.required] ),
    description: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      libelle: '',
      description: ''
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllVille(): Observable<Resultat<Ville[]>> {
    return this.http.get<Resultat<Ville[]>>(`${environment.apiUrl}/api/ville`);
  }

  ajoutVille(ville: Ville): Observable<Resultat<Ville>> {
    console.log('methode du service qui ajoute  ville', ville);
    return this.http.post<Resultat<Ville>>(`${environment.apiUrl}/api/ville`, ville);
  }
  modifVille(ville: Ville): Observable<Resultat<Ville>> {
    console.log('methode du service qui modifier ville', ville);
    return this.http.put<Resultat<Ville>>(`${environment.apiUrl}/api/ville`, ville);
  }
  getVilleById(id: number): Observable<Resultat<Ville>> {
    return this.http.get<Resultat<Ville>>(`${environment.apiUrl}/api/ville/${id}`);
  }
  getVilleByLibelle(libelle: string): Observable<Resultat<Ville>> {
    return this.http.get<Resultat<Ville>>(`${environment.apiUrl}/api/getVilleByLibelle/${libelle}`);
  }
  supprimerVille(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/ville/${id}`);

  }


}
