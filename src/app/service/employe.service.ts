import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import { Personne } from '../models/Personne';
import { map, tap, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employe } from '../models/Employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private employeCreerSource = new Subject<Resultat<Employe>>();
  private employeModifSource = new Subject<Resultat<Employe>>();
  private employeFiltreSource = new Subject<string>();
  private employeSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
employeCreer$ = this.employeCreerSource.asObservable();
employeModif$ = this.employeModifSource.asObservable();
employeFiltre$ = this.employeFiltreSource.asObservable();
employeSupprime$ = this.employeSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    desactiver: new FormControl(''),

  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      nom:'',
     prenom: '',
    email: '',
     telephone: '',
    password:'',
     desactiver: '',
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllEmploye(): Observable<Resultat<Employe[]>> {
    return this.http.get<Resultat<Employe[]>>(`${environment.apiUrl}/api/auth/employe`);
  }
  registraction(personne: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un employe', personne);
    return this.http.post<Resultat<Employe>>(`${environment.apiUrl}/api/auth/signuc/`, personne);
  }
  ajoutEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un employe', employe);
    return this.http.post<Resultat<Personne>>
    (`${environment.apiUrl}/api/auth/employe`,
    employe).pipe(
      tap(res => {
        this.log(`employe crée =${res.body}`);
        this.employeCreer(res);
      }),
      catchError(this.handleError<Resultat<Personne>>('ajoutEmploye'))
    );
  }
  modifEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui modifie un employe', employe);
    return this.http.put<Resultat<Employe>>
    (`${environment.apiUrl}/api/auth/employe`,
    employe).pipe(
      tap(res => {
        this.log(`employe modifié =${res.body}`);
        this.employeModif(res);
      }),
      catchError(this.handleError<Resultat<Employe>>('modifClient'))
    );
  }
  getEmployeById(id: number): Observable<Resultat<Employe>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/employe/${id}`);
  }
  deleteEmployeById(id: number): Observable<Resultat<Employe>> {
    return this.http.delete<Resultat<Personne>>(`${environment.apiUrl}/api/auth/employe/${id}`);
  }

  getEmployeByIdDepartement(id: number): Observable<Resultat<Employe[]>> {
    return this.http.get<Resultat<Employe[]>>(`${environment.apiUrl}/api/auth/employeByDepartement/${id}`);
  }

  rechercheEmployeParMc(mc: string): Observable<Array<Employe>> {
    return this.http.get<Resultat<Array<Personne>>>(`${environment.apiUrl}/api/auth/employebyMc/${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`employe trouve =${res}`))),
        catchError(this.handleError<Array<Personne>>('rechercheClientParMc'))
      );

  }

  employeCreer(res: Resultat<Employe>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.employeCreerSource.next(res);
  }

  employeModif(res: Resultat<Employe>) {
    this.employeModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.employeFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('employeService: ' + message);

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
