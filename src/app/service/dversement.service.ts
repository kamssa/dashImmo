import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Resultat } from '../models/resultat';
import { Versement } from '../models/Versement';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { DetailVersement } from '../models/DetailVersement';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DVersementService {

  private dVerementCreerSource = new Subject<Resultat<DetailVersement>>();
  private  dVerementModifSource = new Subject<Resultat<DetailVersement>>();
  private  dVerementFiltreSource = new Subject<string>();
  private  dVerementSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
dVerementCreer$ = this.dVerementCreerSource.asObservable();
dVerementModif$ = this.dVerementModifSource.asObservable();
dVerementFiltre$ = this.dVerementFiltreSource.asObservable();
dVerementSupprime$ = this.dVerementSupprimeSource.asObservable();
private currentDetailVersementSubject: BehaviorSubject<any>;

  private _refreshNeeded$ = new Subject<DetailVersement>();
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {

  }
  public get currenDetailVersementValue(): DetailVersement {
    return this.currentDetailVersementSubject.value;
  }
  getAllDVersement(): Observable<Resultat<DetailVersement[]>> {
    return this.http.get<Resultat<DetailVersement[]>>(
      `${environment.apiUrl}/api/dversement`
    );
  }

  ajoutDVersement(versement: DetailVersement): Observable<Resultat<DetailVersement>> {
    console.log('methode du service qui ajoute  versement', versement);
    return this.http.post<Resultat<DetailVersement>>(
      `${environment.apiUrl}/api/dversement`,
      versement
    ).pipe(
      tap(res => {
        this.log(`DetailVersement crée =${res.body.montantVerse}`);
        this.detailVersementCreer(res);
        this._refreshNeeded$.next(res.body);
      }),
      catchError(this.handleError<Resultat<DetailVersement>>('ajoutDVersement'))
    );
  }
  modifDVersement(versement: DetailVersement): Observable<Resultat<DetailVersement>> {
    console.log('methode du service qui modifier versement', versement);
    return this.http.put<Resultat<DetailVersement>>(
      `${environment.apiUrl}/api/dversement`,
      versement
    ).pipe(
      tap(res => {
        this.log(`DetailVersement modifier =${res.body.montantVerse}`);
        this.detailVersementModif(res);
      }),
      catchError(this.handleError<Resultat<DetailVersement>>('modifDVersement'))
    );
  }
  getDVersementById(id: number): Observable<Resultat<DetailVersement>> {
    return this.http.get<Resultat<DetailVersement>>(
      `${environment.apiUrl}/api/dversement/${id}`
    );
  }
  getDVersementByIdClient(id: number): Observable<Resultat<DetailVersement[]>> {
    return this.http.get<Resultat<DetailVersement[]>>(
      `${environment.apiUrl}/api/dversementByIdPersonne/${id}`
    );
  }
  getDVersementByVersement(id: number): Observable<Resultat<DetailVersement[]>> {
    return this.http.get<Resultat<DetailVersement[]>>(
      `${environment.apiUrl}/api/dversementByVersement/${id}`
    );
  }
  supprimerDVersement(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/dversement/${id}`);
  }
  detailVersementCreer(res: Resultat<DetailVersement>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.dVerementCreerSource.next(res);
  }

  detailVersementModif(res: Resultat<DetailVersement>) {
    this.dVerementModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.dVerementFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('dVersementService: ' + message);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
