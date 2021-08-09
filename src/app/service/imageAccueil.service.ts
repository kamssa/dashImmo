import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {MessageService} from './message.service';
import {Resultat} from '../models/resultat';
import {Maison} from '../models/Maison';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {ImageAccueil} from '../models/ImageAccueil';

@Injectable({
  providedIn: 'root'
})
export class ImageAccueilService {

  private _refreshNeeded$ = new Subject<void>();



  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  get refreshNeeded(){
    return  this._refreshNeeded$;
  }
  getAllImageAccueil(): Observable<Resultat<ImageAccueil[]>> {
    return this.http.get<Resultat<ImageAccueil[]>>(`${environment.apiUrl}/api/imageAccueil`);
  }

  ajoutImageAccueil(imageAccueil: ImageAccueil): Observable<Resultat<ImageAccueil>> {
    console.log('methode du service qui ajoute  terrain', imageAccueil);
    return this.http.post<Resultat<ImageAccueil>>(`${environment.apiUrl}/api/imageAccueil`, imageAccueil);
  }
  modifImageAccueil(imageAccueil: ImageAccueil): Observable<Resultat<ImageAccueil>> {
    console.log('methode du service qui modifier terrain', imageAccueil);
    return this.http.put<Resultat<ImageAccueil>>(`${environment.apiUrl}/api/imageAccueil`, imageAccueil);
  }
  getImageAccueilById(id: ImageAccueil): Observable<Resultat<ImageAccueil>> {
    return this.http.get<Resultat<ImageAccueil>>(`${environment.apiUrl}/api/imageAccueil/${id}`);
  }
  supprimerImageAccueil(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/imageAccueil/${id}`)
      .pipe(map(res => {
        this._refreshNeeded$.next();
        return res;
      }));

  }
  uploadImageAccueil(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/uploadImageAccueil/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


}
