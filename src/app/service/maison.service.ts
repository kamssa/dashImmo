import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {MessageService} from './message.service';
import {Resultat} from '../models/resultat';
import {Maison} from '../models/Maison';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaisonService {

  private _refreshNeeded$ = new Subject<void>();



  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  get refreshNeeded(){
    return  this._refreshNeeded$;
  }
  getAllMaison(): Observable<Resultat<Maison[]>> {
    return this.http.get<Resultat<Maison[]>>(`${environment.apiUrl}/api/maison`);
  }

  ajoutMaison(maison: Maison): Observable<Resultat<Maison>> {
    console.log('methode du service qui ajoute  terrain', maison);
    return this.http.post<Resultat<Maison>>(`${environment.apiUrl}/api/maison`, maison);
  }
  modifMaison(maison: Maison): Observable<Resultat<Maison>> {
    console.log('methode du service qui modifier terrain', maison);
    return this.http.put<Resultat<Maison>>(`${environment.apiUrl}/api/maison`, maison);
  }
  getMaisonById(id: Maison): Observable<Resultat<Maison>> {
    return this.http.get<Resultat<Maison>>(`${environment.apiUrl}/api/maison/${id}`);
  }
  supprimerMaison(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/maison/${id}`)
      .pipe(map(res => {
        this._refreshNeeded$.next();
        return res;
      }));

  }
  uploadImage(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/uploadMaison/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  downloadImage( publicId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'image/jpg; charset=utf-8');
    return this.http.get(`${environment.apiUrl}/api/downloadImg/${publicId}`,{
      headers: headers,
      observe: 'response',
      responseType: 'text'
    });

  }

}
