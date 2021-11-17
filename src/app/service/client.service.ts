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

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientCreerSource = new Subject<Resultat<Client>>();
  private clientModifSource = new Subject<Resultat<Client>>();
  private clientFiltreSource = new Subject<string>();
  private clientSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  clientCreer$ = this.clientCreerSource.asObservable();
  clientModif$ = this.clientModifSource.asObservable();
  clientFiltre$ = this.clientFiltreSource.asObservable();
  clientSupprime$ = this.clientSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    titre: new FormControl(''),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    numCni: new FormControl('', [Validators.required]),
    numPassport:  new FormControl(''),
    codePays: new FormControl(''),
    telephone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fonction: new FormControl(''),
    actived: new FormControl(''),
    desactiver: new FormControl('')
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
     titre: '',
     nom:'',
     prenom: '',
    email: '',
    numCni: '',
    numPassport: '',
    codePays: '',
    telephone: '',
    password:'',
    fonction: '',
    actived: '',
    desactiver: ''
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllClient(): Observable<Resultat<Personne[]>> {
    return this.http.get<Resultat<Personne[]>>(`${environment.apiUrl}/api/auth/client`);
  }
  registraction(personne: Personne): Observable<Resultat<Personne>> {
    console.log('methode du service qui ajoute un client', personne);
    return this.http.post<Resultat<Personne>>(`${environment.apiUrl}/api/auth/signuc/`, personne);
  }
  ajoutClient(client: Personne): Observable<Resultat<Personne>> {
    console.log('methode du service qui ajoute un client', client);
    return this.http.post<Resultat<Personne>>
    (`${environment.apiUrl}/api/auth/client`,
     client).pipe(
      tap(res => {
        this.log(`Client crée =${res.body}`);
        this.clientCreer(res);
      }),
      catchError(this.handleError<Resultat<Personne>>('ajoutClient'))
    );
  }
  modifClient(client: Personne): Observable<Resultat<Personne>> {
    console.log('methode du service qui modifie un client', client);
    return this.http.put<Resultat<Personne>>
    (`${environment.apiUrl}/api/auth/client`,
     client).pipe(
      tap(res => {
        this.log(`Client modifié =${res.body}`);
        this.clientModif(res);
      }),
      catchError(this.handleError<Resultat<Personne>>('modifClient'))
    );
  }
  getClientById(id: number): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/client/${id}`);
  }
  deleteClientById(id: number): Observable<Resultat<Personne>> {
    return this.http.delete<Resultat<Personne>>(`${environment.apiUrl}/api/auth/client/${id}`);
  }
  getClientByEmail(email: string): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/getClient/${email}`);
  }
  rechercheClientParMc(mc: string): Observable<Array<Personne>> {
    return this.http.get<Resultat<Array<Personne>>>(`${environment.apiUrl}/api/auth/clientbyMc/${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`client trouve =${res}`))),
        catchError(this.handleError<Array<Personne>>('rechercheClientParMc'))
      );

  }

  clientCreer(res: Resultat<Personne>) {
    console.log('Client a ete  creer correctement essaie source');
    this.clientCreerSource.next(res);
  }

  clientModif(res: Resultat<Personne>) {
    this.clientModifSource.next(res);
  }

  filtreClient(text: string) {
    this.clientFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('clientService: ' + message);

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
