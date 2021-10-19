import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Admin} from '../models/Admin';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Personne} from '../models/Personne';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAdminById(id: Admin): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/admin/${id}`);
  }

}
