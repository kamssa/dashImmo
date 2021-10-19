import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { Resultat } from '../models/resultat';
import { Versement } from '../models/Versement';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class VersementService {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  form = this.fb.group({
    id: '',
    version: '',
    date: '',
    montantVerse: '',
    solde: '',
    reste: '',
    terrainVendu: '',
    employe: '',
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      date: '',
      montantVerse: '',
      solde: '',
      reste: '',
      terrainVendu: '',
      employe: '',
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllVersement(): Observable<Resultat<Versement[]>> {
    return this.http.get<Resultat<Versement[]>>(
      `${environment.apiUrl}/api/versement`
    );
  }

  ajoutVersement(versement: Versement): Observable<Resultat<Versement>> {
    console.log('methode du service qui ajoute  versement', versement);
    return this.http.post<Resultat<Versement>>(
      `${environment.apiUrl}/api/versement`,
      versement
    );
  }
  modifVersement(versement: Versement): Observable<Resultat<Versement>> {
    console.log('methode du service qui modifier versement', versement);
    return this.http.put<Resultat<Versement>>(
      `${environment.apiUrl}/api/versement`,
      versement
    );
  }
  getVersementById(id: number): Observable<Resultat<Versement>> {
    return this.http.get<Resultat<Versement>>(
      `${environment.apiUrl}/api/versement/${id}`
    );
  }

  supprimerVersement(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/versement/${id}`);
  }
}
