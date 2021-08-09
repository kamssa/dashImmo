import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Ville} from '../models/combo/Ville';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
// observables sources
  private categorieCreerSource = new Subject<Resultat<Ville>>();
  private categorieModifSource = new Subject<Resultat<Ville>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.categorieCreerSource.asObservable();
  travauxModif$ = this.categorieModifSource.asObservable();
  travauxFiltre$ = this.categorieFiltreSource.asObservable();
  travauxSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
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

  categorieCreer(res: Resultat<Ville>) {
    console.log('Ville a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  categorieModif(res: Resultat<Ville>) {
    this.categorieModifSource.next(res);
  }

  filtrecategorie(text: string) {
    this.categorieFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
    this.categorieSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('categorieService: ' + message);

  }

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
