import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {MessageService} from './message.service';
import {Resultat} from '../models/resultat';
import {Maison} from '../models/Maison';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {FlashMaison} from '../models/FlashMaison';

@Injectable({
  providedIn: 'root'
})
export class FlashMaisonService {

  private _refreshNeeded$ = new Subject<void>();



  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  get refreshNeeded(){
    return  this._refreshNeeded$;
  }
  getAllFlashMaison(): Observable<Resultat<FlashMaison[]>> {
    return this.http.get<Resultat<FlashMaison[]>>(`${environment.apiUrl}/api/flashMaison`);
  }

  ajoutFlashMaison(flashMaison: FlashMaison): Observable<Resultat<FlashMaison>> {
    console.log('methode du service qui ajoute  terrain', flashMaison);
    return this.http.post<Resultat<FlashMaison>>(`${environment.apiUrl}/api/flashMaison`, flashMaison);
  }
  modifFlashMaison(flashMaison: FlashMaison): Observable<Resultat<FlashMaison>> {
    console.log('methode du service qui modifier terrain', flashMaison);
    return this.http.put<Resultat<FlashMaison>>(`${environment.apiUrl}/api/flashMaison`, flashMaison);
  }
  getFlashMaisonById(id: Maison): Observable<Resultat<FlashMaison>> {
    return this.http.get<Resultat<FlashMaison>>(`${environment.apiUrl}/api/flashMaison/${id}`);
  }
  supprimerFlashMaison(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/flashMaison/${id}`)
      .pipe(map(res => {
        this._refreshNeeded$.next();
        return res;
      }));

  }
  uploadImage(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/uploadfashMaison/?id=${id}`, formData, {
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
