import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Produit} from '../models/Produit';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllProduit(): Observable<Resultat<Produit[]>> {
    return this.http.get<Resultat<Produit[]>>(`${environment.apiUrl}/api/produit`);
  }
  getProduitById(id: number): Observable<Resultat<Produit>> {
    return this.http.get<Resultat<Produit>>(`${environment.apiUrl}/api/produit/${id}`);
  }
  getAbonneGeo(): Observable<Resultat<Produit[]>> {
    return this.http.get<Resultat<Produit[]>>(`${environment.apiUrl}/api/abonneGeo`);
  }
  supprimAbonneGeo(): Observable<Resultat<Produit[]>> {
    return this.http.get<Resultat<Produit[]>>(`${environment.apiUrl}/api/abonneGeo`);
  }
}
