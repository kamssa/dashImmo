import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Resultat} from '../models/resultat';
import {environment} from '../../environments/environment.prod';
import {ImageDetail} from '../models/ImageDetail';
import {DetailTerrain} from '../models/DetailTerrain';

@Injectable({
  providedIn: 'root'
})
export class DetailTerrainService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDetailTerrain(): Observable<Resultat<DetailTerrain[]>> {
    return this.http.get<Resultat<DetailTerrain[]>>(`${environment.apiUrl}/api/detailTerrain`);
  }
  ajoutDetailTerrain(detailTerrain: DetailTerrain): Observable<Resultat<DetailTerrain>> {
    console.log('methode du service qui ajoute  detailTerrain', detailTerrain);
    return this.http.post<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailTerrain`, detailTerrain);
  }
  modifDetailTerrain(detailTerrain: DetailTerrain): Observable<Resultat<DetailTerrain>> {
    console.log('methode du service qui modifie  detailTerrain', detailTerrain);
    return this.http.put<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailTerrain`, detailTerrain);
  }
  getDetailTerrainByIdTerrain(id: number): Observable<Resultat<DetailTerrain>> {
    return this.http.get<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailTerrainByIdTerrain/${id}`);
  }
  getDetailTerrainById(id: number): Observable<Resultat<DetailTerrain>> {
    return this.http.get<Resultat<DetailTerrain>>(`${environment.apiUrl}/api/detailTerrain/${id}`);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/detailTerrain/${id}`);

  }
  getImageDetailArticlesByIdDetailArticle(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/image/${id}`);
  }
}
