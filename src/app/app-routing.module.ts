import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {AuthGuardService} from './helper/auth-guard.service';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {ListeDocComponent} from './documents/liste-doc/liste-doc.component';
import {ListeTerrainsComponent} from './terrains/liste-terrains/liste-terrains.component';
import {ListeVilleComponent} from './villes/liste-ville/liste-ville.component';
import {ListeMaisonComponent} from './maison/liste-maison/liste-maison.component';
import {ListProduitVenduComponent} from './produitVendu/list-produit-vendu/list-produit-vendu.component';
import {ListProduitAGeoComponent} from './produitAGeolocaliser/list-produit-ageo/list-produit-ageo.component';
import {ListeDemandeComponent} from './demande/liste-demande/liste-demande.component';
import {ListeDemandeLuComponent} from './demande/liste-demande-lu/liste-demande-lu.component';
import {ListClientComponent} from './client/list-client/list-client.component';
import {ListFlashMaisonComponent} from './flashMaison/list-flash-maison/list-flash-maison.component';

const routes: Routes = [

  { path: 'connexion', component: ConnexionComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuardService],
    children: [{
      path: 'dashboard',
      component: DashboardComponent
    },
      {path: 'listDoc', component: ListeDocComponent},
      {path: 'listTerrains', component: ListeTerrainsComponent},
      {path: 'listVille', component: ListeVilleComponent},
      {path: 'listMaison', component: ListeMaisonComponent},
      { path: 'terrainVendu',   component: ListProduitVenduComponent },
      { path: 'terrainAGEO',   component: ListProduitAGeoComponent },
      { path: 'demande',   component: ListeDemandeComponent },
      { path: 'demandeArchiver',   component: ListeDemandeLuComponent },
      { path: 'listClient',   component: ListClientComponent },
      { path: 'listFlasMaison',   component: ListFlashMaisonComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
