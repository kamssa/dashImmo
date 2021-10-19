import { Injectable } from '@angular/core';
import {Document} from '../models/Document';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Resultat} from '../models/resultat';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
// observables sources
  documents: Document[];

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDocument(): Observable<Resultat<Document[]>> {
    return this.http.get<Resultat<Document[]>>(`${environment.apiUrl}/api/document`);
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    libelle: new FormControl('',[Validators.required] ),
    description: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      libelle: '',
      description: ''
    });
  }
  ajoutDocument(categorie: Document): Observable<Resultat<Document>> {
    console.log('methode du service qui ajoute  categorie', categorie);
    return this.http.post<Resultat<Document>>(`${environment.apiUrl}/api/document`, categorie);
  }
  modifDocument(categorie: Document): Observable<Resultat<Document>> {
    console.log('methode du service qui modifier document', categorie);
    return this.http.put<Resultat<Document>>(`${environment.apiUrl}/api/document`, categorie);
  }
  getDocumentById(id: number): Observable<Resultat<Document>> {
    return this.http.get<Resultat<Document>>(`${environment.apiUrl}/api/document/${id}`);
  }
  getDocumentByNom(libelle: string): Observable<Resultat<Document>> {
    return this.http.get<Resultat<Document>>(`${environment.apiUrl}/api/getdocumentByLibelle/${libelle}`);
  }
  supprimerDocument(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/document/${id}`);

  }
  populateForm(id) {
    this.form.patchValue(id);
  }
}
