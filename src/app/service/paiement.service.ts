import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Ville} from '../models/combo/Ville';
import {environment} from '../../environments/environment.prod';
import {Paiement} from '../models/Paiement';
import {Personne} from '../models/Personne';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private  http: HttpClient,
              private messageService: MessageService, private fb: FormBuilder) {
  }
  form: FormGroup = this.fb.group({
    id: '',
    montantVerse: '' ,
    resteapaye: '',
    date: '',
    nomComplet: ''


  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      montantVerse: '',
      resteapaye: '',
      date: '',
      nomComplet: ''
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllVersement(): Observable<Resultat<Paiement[]>> {
    return this.http.get<Resultat<Paiement[]>>(`${environment.apiUrl}/api/versement`);
  }

  ajoutVersement(ville: Paiement): Observable<Resultat<Paiement>> {
    console.log('methode du service qui ajoute  ville', ville);
    return this.http.post<Resultat<Paiement>>(`${environment.apiUrl}/api/versement`, ville);
  }
  modifVersement(ville: Paiement): Observable<Resultat<Paiement>> {
    console.log('methode du service qui modifier ville', ville);
    return this.http.put<Resultat<Paiement>>(`${environment.apiUrl}/api/versement`, ville);
  }
  getVersementById(id: number): Observable<Resultat<Paiement>> {
    return this.http.get<Resultat<Ville>>(`${environment.apiUrl}/api/versement/${id}`);
  }

  supprimerVersement(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/versement/${id}`);

  }

}
