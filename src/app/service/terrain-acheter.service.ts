import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {TerrainAcheter} from '../models/TerrainAcheter';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TerrainAcheterService {

  // observables sources
  private categorieCreerSource = new Subject<Resultat<TerrainAcheter>>();
  private categorieModifSource = new Subject<Resultat<TerrainAcheter>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.categorieCreerSource.asObservable();
  travauxModif$ = this.categorieModifSource.asObservable();
  travauxFiltre$ = this.categorieFiltreSource.asObservable();
  travauxSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllTerrainAcheter(): Observable<Resultat<TerrainAcheter[]>> {
    return this.http.get<Resultat<TerrainAcheter[]>>(`${environment.apiUrl}/api/terrainAcheter`);
  }

  ajoutTerrainAcheter(terrainAcheter: TerrainAcheter): Observable<Resultat<TerrainAcheter>> {
    console.log('methode du service qui ajoute  terrainAcheter', terrainAcheter);
    return this.http.post<Resultat<TerrainAcheter>>(`${environment.apiUrl}/api/terrainAcheter`, terrainAcheter);
  }
  modifTerrainAcheter(terrainAcheter: TerrainAcheter): Observable<Resultat<TerrainAcheter>> {
    console.log('methode du service qui modifier terrainAcheter', terrainAcheter);
    return this.http.put<Resultat<TerrainAcheter>>(`${environment.apiUrl}/api/terrainAcheter`, terrainAcheter);
  }
  getTerrainAcheterById(id: number): Observable<Resultat<TerrainAcheter>> {
    return this.http.get<Resultat<TerrainAcheter>>(`${environment.apiUrl}/api/terrainAcheter/${id}`);
  }
  getTerrainAcheterByIdPersonne(id: number): Observable<Resultat<TerrainAcheter>> {
    return this.http.get<Resultat<TerrainAcheter>>(`${environment.apiUrl}/api/getTerrainAcheteByIdPersonne/${id}`);
  }


  supprimerTerrainAcheter(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/terrainAcheter/${id}`);

  }

  categorieCreer(res: Resultat<TerrainAcheter>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  categorieModif(res: Resultat<TerrainAcheter>) {
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
