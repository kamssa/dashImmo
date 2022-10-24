import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Terrain} from '../models/Terrain';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {FlashTerrain} from '../models/FlashTerrain';

@Injectable({
  providedIn: 'root'
})
export class FlashTerrainService {
// observables sources
  private flashTerrainCreerSource = new Subject<Resultat<FlashTerrain>>();
  private flashTerrainModifSource = new Subject<Resultat<FlashTerrain>>();
  private flashTerrainFiltreSource = new Subject<string>();
  private flashTerrainSupprimeSource = new Subject<Resultat<boolean>>();

  private _refreshNeeded$ = new Subject<void>();

// observables streams
  flashTerrainCreer$ = this.flashTerrainCreerSource.asObservable();
  flashTerrainModif$ = this.flashTerrainModifSource.asObservable();
  flashTerrainFiltre$ = this.flashTerrainFiltreSource.asObservable();
  flashTerrainSupprime$ = this.flashTerrainSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private fb: FormBuilder,
              private messageService: MessageService) {
  }
  form: FormGroup = this.fb.group({
    id: [''],
    version: [''],
    libelle: [''],
    surfaceUtile: [''],
    surfaceTerrain: [''],
    situationGeographique: [''],
    flashmaisonType: [''],
    prix: [''],
    description: [''],
    numero: [''],
    ville: [''],
    document: [''],
    type: ['']
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      libelle: '',
      surfaceUtile: '',
      surfaceTerrain: '',
      situationGeographique: '',
      flashmaisonType: '',
      prix: '',
      description: '',
      numero: '',
      ville: '',
      document: '',
      type: ''
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  get refreshNeeded(){
    return  this._refreshNeeded$;
  }
  getAllFlashTerrain(): Observable<Resultat<FlashTerrain[]>> {
    return this.http.get<Resultat<FlashTerrain[]>>(`${environment.apiUrl}/api/flashTerrain`);
  }

  ajoutFlashTerrain(flashTerrain: FlashTerrain): Observable<Resultat<FlashTerrain>> {
    console.log('methode du service qui ajoute  flashTerrain', flashTerrain);
    return this.http.post<Resultat<FlashTerrain>>(`${environment.apiUrl}/api/flashTerrain`, flashTerrain);
  }
  modifTerrainFlashTerrain(flashTerrain: FlashTerrain): Observable<Resultat<FlashTerrain>> {
    console.log('methode du service qui modifier flashTerrain', flashTerrain);
    return this.http.put<Resultat<FlashTerrain>>(`${environment.apiUrl}/api/flashTerrain`, flashTerrain);
  }
  getFlashTerrainById(id: number): Observable<Resultat<FlashTerrain>> {
    return this.http.get<Resultat<FlashTerrain>>(`${environment.apiUrl}/api/flashTerrain/${id}`);
  }
  supprimerFlashTerrain(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/flashTerrain/${id}`)
      .pipe(map(res => {
        this._refreshNeeded$.next();
        return res;
      }));

  }
  getDetailTerrainById(id: number): Observable<Resultat<FlashTerrain>> {
    return this.http.get<Resultat<FlashTerrain>>(`${environment.apiUrl}/api/flashTerrain/${id}`);
  }
  terrainCreer(res: Resultat<FlashTerrain>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.flashTerrainCreerSource.next(res);
  }

  terrainModif(res: Resultat<FlashTerrain>) {
    this.flashTerrainModifSource.next(res);
  }

  filtreTerrain(text: string) {
    this.flashTerrainFiltreSource.next(text);
  }

  terrainSupprime(res: Resultat<boolean>) {
    this.flashTerrainSupprimeSource.next(res);
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
