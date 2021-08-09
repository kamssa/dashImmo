import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {environment} from '../../environments/environment.prod';
import {ImageDetail} from '../models/ImageDetail';
import {DetailTerrain} from '../models/DetailTerrain';
import {DetailMaison} from "../models/DetailMaison";
import {Maison} from '../models/Maison';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailMaisonService {
  private _refreshNeeded$ = new Subject<void>();
  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  get refreshNeeded(){
    return  this._refreshNeeded$;
  }
  getAllDetailMaison(): Observable<Resultat<DetailMaison[]>> {
    return this.http.get<Resultat<DetailMaison[]>>(`${environment.apiUrl}/api/detailMaison`);
  }
  ajoutDetailMaison(detailMaison: DetailMaison): Observable<Resultat<DetailMaison>> {
    console.log('methode du service qui ajoute  detailTerrain', detailMaison);
    return this.http.post<Resultat<DetailMaison>>(`${environment.apiUrl}/api/detailMaison`, detailMaison);
  }
  modifDetailMaison(detailMaison: DetailMaison): Observable<Resultat<DetailMaison>> {
    console.log('methode du service qui modifier terrain', detailMaison);
    return this.http.put<Resultat<DetailMaison>>(`${environment.apiUrl}/api/detailMaison`, detailMaison);
  }
  getDetailMaisonByIdMaison(id: number): Observable<Resultat<DetailTerrain>> {
    return this.http.get<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailMaisonByIdMaison/${id}`);
  }
  getDetailMaisonById(id: number): Observable<Resultat<DetailTerrain>> {
    return this.http.get<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailMaison/${id}`);
  }
  getImageDetailMaisonByIdDetailMaison(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/image/${id}`);
  }
  supprimerDetailMaison(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/detailMaison/${id}`)
      .pipe(map(res => {
        this._refreshNeeded$.next();
        return res;
      }));

  }
}
