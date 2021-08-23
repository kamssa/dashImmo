import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {DemandeService} from '../../../service/demande.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  taille: number;
@Output() toggleSideBarMenu: EventEmitter<any> = new EventEmitter<any>();
  constructor(private authService: AuthService,
              private router: Router, private demandeService: DemandeService) { }

  ngOnInit(): void {
  /*  setInterval(() => {
      this.demandeService.nbreDemandeNonLu().subscribe(data => {
        console.log(data.body.length);
        this.taille = data.body.length;
      });
    }, 2000);*/
  }

  toggleSideBar() {
 this.toggleSideBarMenu.emit();
 setTimeout (() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {
  this.authService.logout();
  this.router.navigate(['/connexion']);
  }

  redirect() {
  this.router.navigate(['/demande']);

  }
}
