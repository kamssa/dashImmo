import { Injectable } from '@angular/core';
import {Document} from '../models/Document';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Resultat} from '../models/resultat';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
// observables sources
  documents: Document[];
  private categorieCreerSource = new Subject<Resultat<Document>>();
  private categorieModifSource = new Subject<Resultat<Document>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.categorieCreerSource.asObservable();
  travauxModif$ = this.categorieModifSource.asObservable();
  travauxFiltre$ = this.categorieFiltreSource.asObservable();
  travauxSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDocument(): Observable<Resultat<Document[]>> {
    return this.http.get<Resultat<Document[]>>(`${environment.apiUrl}/api/document`);
  }

  ajoutDocument(categorie: Document): Observable<Resultat<Document>> {
    console.log('methode du service qui ajoute  categorie', categorie);
    return this.http.post<Resultat<Document>>(`${environment.apiUrl}/api/document`, categorie);
  }
  modifDocument(categorie: Document): Observable<Resultat<Document>> {
    console.log('methode du service qui modifier categorie', categorie);
    return this.http.put<Resultat<Document>>(`${environment.apiUrl}/api/document`, categorie);
  }
  getDocumentById(id: number): Observable<Resultat<Document>> {
    return this.http.get<Resultat<Document>>(`${environment.apiUrl}/api/document/${id}`);
  }
  getDocumentByNom(libelle: string): Observable<Resultat<Document>> {
    return this.http.get<Resultat<Document>>(`${environment.apiUrl}/api/getdocumentByLibelle/${libelle}`);
  }
  supprimerDocument(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/document/${id}`);

  }

  categorieCreer(res: Resultat<Document>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  categorieModif(res: Resultat<Document>) {
    this.categorieModifSource.next(res);
  }

  filtrecategorie(text: string) {
    this.categorieFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
    this.categorieSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('categorieService: ' + message);

  }

  ///////////////////////////////////////////
  // recuper les erreurs


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
