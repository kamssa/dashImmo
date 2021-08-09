import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Demande} from '../models/Demande';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
// observables sources
  private categorieCreerSource = new Subject<Resultat<Demande>>();
  private categorieModifSource = new Subject<Resultat<Demande>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.categorieCreerSource.asObservable();
  travauxModif$ = this.categorieModifSource.asObservable();
  travauxFiltre$ = this.categorieFiltreSource.asObservable();
  travauxSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDemande(): Observable<Resultat<Demande[]>> {
    return this.http.get<Resultat<Demande[]>>(`${environment.apiUrl}/api/demande`);
  }

  ajoutDemande(demande: Demande): Observable<Resultat<Demande>> {
    console.log('methode du service qui ajoute  demande', demande);
    return this.http.post<Resultat<Demande>>(`${environment.apiUrl}/api/demande`, demande);
  }
  modifDemande(demande: Demande): Observable<Resultat<Demande>> {
    console.log('methode du service qui modifier demande', demande);
    return this.http.put<Resultat<Demande>>(`${environment.apiUrl}/api/demande`, demande);
  }
  getDemandeById(id: number): Observable<Resultat<Demande>> {
    return this.http.get<Resultat<Demande>>(`${environment.apiUrl}/api/demande/${id}`);
  }
  getDemandeByIdPersonne(id: number): Observable<Resultat<Demande[]>> {
    return this.http.get<Resultat<Demande[]>>(`${environment.apiUrl}/api/getDemandeParIdPersonne/${id}`);
  }

  supprimerDemande(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/demande/${id}`);

  }
  nbreDemandeNonLu(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/demandeNonLu`);

  }

  categorieCreer(res: Resultat<Demande>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  categorieModif(res: Resultat<Demande>) {
    this.categorieModifSource.next(res);
  }

  filtrecategorie(text: string) {
    this.categorieFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
    this.categorieSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('demandeService: ' + message);

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
