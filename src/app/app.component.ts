import {Component, OnInit} from '@angular/core';
import {DemandeService} from './service/demande.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'dashbordImmoGstoreplus';
  constructor(private demandeService: DemandeService) {
  }
  ngOnInit(): void {

     /*setInterval(() => {
       this.demandeService.getAllDemande().subscribe(data =>{
       //console.log(data.body);
       });
    }, 2000);*/

  }
}
