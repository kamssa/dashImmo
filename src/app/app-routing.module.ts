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
import {ListImageAccueilComponent} from './accueil/list-image-accueil/list-image-accueil.component';
import {ListBlogComponent} from './blogs/list-blog/list-blog.component';
import { VersementComponent } from './versement/versement/versement.component';
import { ListDepComponent } from './departement/list-dep/list-dep.component';
import { ListEmplComponent } from './employe/list-empl/list-empl.component';
import { ListProspectComponent } from './prospect/list-prospect/list-prospect.component';
import {ListFlashTerrainComponent} from './flashTerrain/list-flash-terrain/list-flash-terrain.component';


const routes: Routes = [

  { path: 'connexion', component: ConnexionComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuardService],
    children: [
     {path: 'dashboard', component: DashboardComponent},
      {path: 'listTerrains', component: ListeTerrainsComponent},
     {path: 'listVille', component: ListeVilleComponent},
     {path: 'listMaison', component: ListeMaisonComponent},
     { path: 'terrainVendu',   component: ListProduitVenduComponent },
     { path: 'terrainAGEO',   component: ListProduitAGeoComponent },
     { path: 'demande',   component: ListeDemandeComponent },
     { path: 'demandeArchiver',   component: ListeDemandeLuComponent },
     { path: 'listClient',   component: ListClientComponent },
     { path: 'listFlasMaison',   component: ListeMaisonComponent },
      { path: 'listFlasTerrain',   component: ListFlashTerrainComponent },
     { path: 'imageAccueil',   component: ListImageAccueilComponent },
     {path: 'listDoc', component: ListeDocComponent},
     {path: 'listBlog', component: ListBlogComponent},
      {path: 'versement', component: VersementComponent},
      {path: 'employe', component: ListEmplComponent},
      {path: 'departement', component: ListDepComponent},
      {path: 'prospect', component: ListProspectComponent}


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
