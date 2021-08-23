import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {MessageService} from './message.service';
import {Resultat} from '../models/resultat';
import {Maison} from '../models/Maison';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {ImageAccueil} from '../models/ImageAccueil';
import {Blog} from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _refreshNeeded$ = new Subject<void>();



  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  get refreshNeeded(){
    return  this._refreshNeeded$;
  }
  getAllBlog(): Observable<Resultat<Blog[]>> {
    return this.http.get<Resultat<Blog[]>>(`${environment.apiUrl}/api/blog`);
  }

  ajoutBlog(blog: Blog): Observable<Resultat<Blog>> {
    console.log('methode du service qui ajoute  terrain', blog);
    return this.http.post<Resultat<Blog>>(`${environment.apiUrl}/api/blog`, blog);
  }
  modifBlog(blog: Blog): Observable<Resultat<Blog>> {
    console.log('methode du service qui modifier terrain', blog);
    return this.http.put<Resultat<Blog>>(`${environment.apiUrl}/api/blog`, blog);
  }
  getBlogById(id: Blog): Observable<Resultat<Blog>> {
    return this.http.get<Resultat<Blog>>(`${environment.apiUrl}/api/blog/${id}`);
  }
  supprimerBlog(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/blog/${id}`)
      .pipe(map(res => {
        this._refreshNeeded$.next();
        return res;
      }));

  }
  uploadImageAccueil(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/uploadBlog/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


}
