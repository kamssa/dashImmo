import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {TerrainVendu} from '../models/TerrainVendu';
import { map, tap, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TerrainVenduService {
  private terrainVenduCreerSource = new Subject<Resultat<TerrainVendu>>();
  private terrainVenduModifSource = new Subject<Resultat<TerrainVendu>>();
  private terrainVenduFiltreSource = new Subject<string>();
  private terrainVenduSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
   terrainVenduCreer$ = this.terrainVenduCreerSource.asObservable();
   terrainVenduModif$ = this.terrainVenduModifSource.asObservable();
   terrainVenduFiltre$ = this.terrainVenduFiltreSource.asObservable();
   terrainVenduSupprime$ = this.terrainVenduSupprimeSource.asObservable();

  constructor(private  http: HttpClient,
    private messageService: MessageService, private fb: FormBuilder) {
  }
  form: FormGroup = this.fb.group({
  id: [''],
  version: [''],
  libelle: [''],
  paye: [''],
  abonneGeo: [''],
  unite: [''],
  note: [''],
  prixParMettreCarre: [''],
  superficie: [''],
  surfaceUtilise: [''],
  description: [''],
  latitude: [''],
  longitude: [''],
  numero: [''],
  prix: [''],
  path: [''],
  nomVille: [''],
  typeDocument: [''],
  personne:['']
});
initializeFormGroup() {
  this.form.setValue({
    id: null,
    version: null,
    libelle: '',
    paye: '',
    abonneGeo: '',
    unite: '',
    note: '',
    prixParMettreCarre: '',
    superficie: '',
    surfaceUtilise: '',
    description: '',
    latitude: '',
    longitude: '',
    numero: '',
    prix: '',
    path: '',
    nomVille: '',
    typeDocument: '',
    personne: ''
  });
}
populateForm(id) {
  this.form.patchValue(id);
}
  getAllTerrainVendu(): Observable<Resultat<TerrainVendu[]>> {
    return this.http.get<Resultat<TerrainVendu[]>>(`${environment.apiUrl}/api/terrainVendu`);
  }

  ajoutTerrainVendur(terrainAcheter: TerrainVendu): Observable<Resultat<TerrainVendu>> {
    console.log('methode du service qui ajoute  terrainAcheter', terrainAcheter);
    return this.http.post<Resultat<TerrainVendu>>
    (`${environment.apiUrl}/api/terrainVendu`, terrainAcheter)
    .pipe(
      tap(res => {
        this.log(`Client crée =${res.body}`);
        this.terrainVenduCreer(res);
      }),
      catchError(this.handleError<Resultat<TerrainVendu>>('ajoutTerrainVendur'))
    );;
  }
  modifTerrainVendu(terrainAcheter: TerrainVendu): Observable<Resultat<TerrainVendu>> {
    console.log('methode du service qui modifier terrainAcheter', terrainAcheter);
    return this.http.put<Resultat<TerrainVendu>>
    (`${environment.apiUrl}/api/terrainVendu`, terrainAcheter)
    .pipe(
      tap(res => {
        this.log(`Client modifié =${res.body}`);
        this.terrainVenduModif(res);
      }),
      catchError(this.handleError<Resultat<TerrainVendu>>('modifTerrainVendu'))
    );
  }
  getTerrainVenduById(id: number): Observable<Resultat<TerrainVendu>> {
    return this.http.get<Resultat<TerrainVendu>>(`${environment.apiUrl}/api/terrainVendu/${id}`);
  }
  getTerrainVenduByIdPersonne(id: number): Observable<Resultat<TerrainVendu[]>> {
    return this.http.get<Resultat<TerrainVendu[]>>(`${environment.apiUrl}/api/getTerrainVenduByIdPersonne/${id}`);
  }


  supprimerTerrainVendu(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/terrainVendu/${id}`);

  }
  terrainVenduCreer(res: Resultat<TerrainVendu>) {
    console.log('terrain vendu a ete  creer correctement essaie source');
    this.terrainVenduCreerSource.next(res);
  }

  terrainVenduModif(res: Resultat<TerrainVendu>) {
    this.terrainVenduModifSource.next(res);
  }

  filtreterrainVendu(text: string) {
    this.terrainVenduFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('terrainVenduService: ' + message);

  }
  ///////////////////////////////////////////
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
