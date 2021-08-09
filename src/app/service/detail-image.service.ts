import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable} from "rxjs";
import {Resultat} from "../models/resultat";
import {ImageDetail} from "../models/ImageDetail";

@Injectable({
  providedIn: 'root'
})
export class DetailImageService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getDetailImagesByIdDetail(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/imageDetailByIdDetail/${id}`);
  }
  public uploadDetail(formData, id) {
    console.log('dans le service', formData);
    return this.http.post<any>(`${environment.apiUrl}/api/uploadDetail/?id=${id}`, formData,   {
      reportProgress: true,
      observe: 'events'
    });
  }
  public uploadDetailMaison(formData, id) {
    console.log('dans le service', formData);
    return this.http.post<any>(`${environment.apiUrl}/api/uploadDetailMaison/?id=${id}`, formData,   {
      reportProgress: true,
      observe: 'events'
    });
  }
  public uploadDetaillashMaison(formData, id) {
    console.log('dans le service', formData);
    return this.http.post<any>(`${environment.apiUrl}/api/uploadDetailFlashMaison/?id=${id}`, formData,   {
      reportProgress: true,
      observe: 'events'
    });
  }
  getImageDetaiTerrain(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/imageDetailByIdDetail/${id}`);
  }
  getImageDetaiMaison(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/imageDetailByIdDetail/${id}`);
  }
  getAllImageDetailFlashMaison(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/imageDetailByIdDetail/${id}`);
  }
  getImageDetailFlashMaison(id: number): Observable<Resultat<ImageDetail[]>> {
    return this.http.get<Resultat<ImageDetail[]>>(`${environment.apiUrl}/api/imageDetailFlashMaison/${id}`);
  }
}
