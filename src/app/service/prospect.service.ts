import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Client} from "../models/Client";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import { Personne } from '../models/Personne';
import { map, tap, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Prospects } from '../models/Prospect';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  private prospectCreerSource = new Subject<Resultat<Client>>();
  private  prospectModifSource = new Subject<Resultat<Client>>();
  private  prospectFiltreSource = new Subject<string>();
  private  prospectSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
prospectCreer$ = this. prospectCreerSource.asObservable();
prospectModif$ = this. prospectModifSource.asObservable();
prospectFiltre$ = this. prospectFiltreSource.asObservable();
prospectSupprime$ = this. prospectSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    nomComplet: new FormControl(''),
    email: new FormControl(''),
    codePays: new FormControl(''),
    telephone: new FormControl('', [Validators.required]),
    fonction: new FormControl(''),
    satisfait: new FormControl(''),
    preocupation: new FormControl('')
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      nom:'',
      prenom: '',
      nomComplet: '',
      email: '',
      codePays: '',
      telephone: '',
      fonction: '',
      satisfait: '',
      preocupation: ''
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllProspect(): Observable<Resultat<Prospects[]>> {
    return this.http.get<Resultat<Prospects[]>>(`${environment.apiUrl}/api/auth/prospect`);
  }
  registraction(personne: Prospects): Observable<Resultat<Prospects>> {
    console.log('methode du service qui ajoute un prospect', personne);
    return this.http.post<Resultat<Prospects>>(`${environment.apiUrl}/api/auth/signuc/`, personne);
  }
  ajoutProspect(client: Prospects): Observable<Resultat<Prospects>> {
    console.log('methode du service qui ajoute un prospect', client);
    return this.http.post<Resultat<Prospects>>
    (`${environment.apiUrl}/api/auth/prospect`,
     client).pipe(
      tap(res => {
        this.log(`Prospect crée =${res.body}`);
        this.prospectCreer(res);
      }),
      catchError(this.handleError<Resultat<Prospects>>('ajoutClient'))
    );
  }
  modifProspect(client: Prospects): Observable<Resultat<Prospects>> {
    console.log('methode du service qui modifie un prospect', client);
    return this.http.put<Resultat<Prospects>>
    (`${environment.apiUrl}/api/auth/prospect`,
     client).pipe(
      tap(res => {
        this.log(`Client modifié =${res.body}`);
        this.prospectModif(res);
      }),
      catchError(this.handleError<Resultat<Prospects>>('modifClient'))
    );
  }
  getProspectById(id: number): Observable<Resultat<Prospects>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/prospect/${id}`);
  }
  deleteProspectById(id: number): Observable<Resultat<Prospects>> {
    return this.http.delete<Resultat<Prospects>>(`${environment.apiUrl}/api/auth/prospect/${id}`);
  }
  getProspectByEmail(email: string): Observable<Resultat<Prospects>> {
    return this.http.get<Resultat<Prospects>>(`${environment.apiUrl}/api/auth/getProspect/${email}`);
  }
  rechercheProspectParMc(mc: string): Observable<Array<Prospects>> {
    return this.http.get<Resultat<Array<Prospects>>>(`${environment.apiUrl}/api/auth/clientbyMc/${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`client trouve =${res}`))),
        catchError(this.handleError<Array<Prospects>>('rechercheProspectParMc'))
      );

  }

  prospectCreer(res: Resultat<Prospects>) {
    console.log('Prospect a ete  creer correctement essaie source');
    this. prospectCreerSource.next(res);
  }

  prospectModif(res: Resultat<Prospects>) {
    this. prospectModifSource.next(res);
  }

  filtreProspect(text: string) {
    this. prospectFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('prospectService: ' + message);

  }
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // recuper les erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
