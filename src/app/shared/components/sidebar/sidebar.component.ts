import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ClientService} from '../../../service/client.service';
import {AuthService} from '../../../service/auth.service';
import {Personne} from '../../../models/Personne';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  title = 'projectboris';
  personne: Personne;
  nom: string;
  premierC: string;
  constructor(private router: Router,
              private helper: JwtHelperService,
              private  clientService: ClientService,
              private  authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.refreshNeeded.subscribe(() =>{
      this.getCurrentUser();

    });
    this.getCurrentUser();
  }
  getCurrentUser(){
    if (localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      let decode = this.helper.decodeToken(token);
      console.log(' Dans la navbar', decode);
      this.clientService.getClientById(decode.sub).subscribe(res => {
        console.log('admin', res.body);
        this.personne = res.body;
        this.nom = this.personne.nom;
        this.premierC = this.nom.substr(0, 1);
      });

    }
  }
}
