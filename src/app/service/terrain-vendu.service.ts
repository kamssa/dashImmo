import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {TerrainAcheter} from '../models/TerrainAcheter';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {TerrainVendu} from '../models/TerrainVendu';

@Injectable({
  providedIn: 'root'
})
export class TerrainVenduService {


  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllTerrainVendu(): Observable<Resultat<TerrainVendu[]>> {
    return this.http.get<Resultat<TerrainVendu[]>>(`${environment.apiUrl}/api/terrainVendu`);
  }

  ajoutTerrainVendur(terrainAcheter: TerrainVendu): Observable<Resultat<TerrainVendu>> {
    console.log('methode du service qui ajoute  terrainAcheter', terrainAcheter);
    return this.http.post<Resultat<TerrainVendu>>(`${environment.apiUrl}/api/terrainVendu`, terrainAcheter);
  }
  modifTerrainVendu(terrainAcheter: TerrainVendu): Observable<Resultat<TerrainVendu>> {
    console.log('methode du service qui modifier terrainAcheter', terrainAcheter);
    return this.http.put<Resultat<TerrainVendu>>(`${environment.apiUrl}/api/terrainVendu`, terrainAcheter);
  }
  getTerrainVenduById(id: number): Observable<Resultat<TerrainVendu>> {
    return this.http.get<Resultat<TerrainVendu>>(`${environment.apiUrl}/api/terrainVendu/${id}`);
  }
  getTerrainAcheterByIdPersonne(id: number): Observable<Resultat<TerrainVendu>> {
    return this.http.get<Resultat<TerrainVendu>>(`${environment.apiUrl}/api/getTerrainAcheteByIdPersonne/${id}`);
  }


  supprimerTerrainVendu(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/terrainVendu/${id}`);

  }
}
