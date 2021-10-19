import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ClientService} from '../../../service/client.service';
import {AuthService} from '../../../service/auth.service';
import {Personne} from '../../../models/Personne';
import {AdminService} from '../../../service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  personne: Personne;
  nom: string;
  premierC: string;
  constructor(private router: Router,
              private helper: JwtHelperService,
              private  adminService: AdminService,
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
      this.adminService.getAdminById(decode.sub).subscribe(res => {
        this.personne = res.body;
        this.nom = this.personne.nom;
        this.premierC = this.nom.substr(0, 1);
      });

    }
  }
}
