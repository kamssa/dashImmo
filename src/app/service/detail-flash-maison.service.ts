import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {environment} from '../../environments/environment.prod';
import {ImageDetail} from '../models/ImageDetail';
import {map} from 'rxjs/operators';
import {DetailFlashMaison} from '../models/DetailFlashMaison';

@Injectable({
  providedIn: 'root'
})
export class DetailFlashMaisonService {
  private _refreshNeeded$ = new Subject<void>();
  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  get refreshNeeded(){
    return  this._refreshNeeded$;
  }
  getAllDetailFlashMaison(): Observable<Resultat<DetailFlashMaison[]>> {
    return this.http.get<Resultat<DetailFlashMaison[]>>(`${environment.apiUrl}/api/detailFlashMaison`);
  }
  ajoutDetailFlashMaison(detailFlashMaison: DetailFlashMaison): Observable<Resultat<DetailFlashMaison>> {
    console.log('methode du service qui ajoute  detailTerrain', detailFlashMaison);
    return this.http.post<Resultat<DetailFlashMaison>>(`${environment.apiUrl}/api/detailFlashMaison`, detailFlashMaison);
  }
  modifDetailFlashMaison(detailFlashMaison: DetailFlashMaison): Observable<Resultat<DetailFlashMaison>> {
    console.log('methode du service qui modifier terrain', detailFlashMaison);
    return this.http.put<Resultat<DetailFlashMaison>>(`${environment.apiUrl}/api/detailFlashMaison`, detailFlashMaison);
  }
  getDetailMaisonByIdMaison(id: number): Observable<Resultat<DetailFlashMaison>> {
    return this.http.get<Resultat<DetailFlashMaison>>(`${environment.apiUrl}/api/detailFlashyIdflash/${id}`);
  }
  getDetailFlashMaisonById(id: number): Observable<Resultat<DetailFlashMaison>> {
    return this.http.get<Resultat<DetailFlashMaison>>(`${environment.apiUrl}/api/detailFlashMaison/${id}`);
  }
  getImageDetailByIdDetail(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/imageDetailFlashMaison/${id}`);
  }
  supprimerDetailFlashMaison(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/detailFlashMaison/${id}`)
      .pipe(map(res => {
        this._refreshNeeded$.next();
        return res;
      }));

  }
}
