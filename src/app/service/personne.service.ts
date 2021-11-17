import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Personne} from '../models/Personne';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {


  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllPersonne(): Observable<Resultat<Personne[]>> {
    return this.http.get<Resultat<Personne[]>>(`${environment.apiUrl}/api/personne`);
  }
   getEmployeByEmail(email: string): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/getEmployeByEmail/${email}`);
  }
}
