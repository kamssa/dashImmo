import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {JWT_OPTIONS, JwtHelperService, JwtInterceptor} from '@auth0/angular-jwt';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ErrorInterceptor} from './helper/error.interceptor';
import {APP_DATE_FORMATS, AppDateAdapter} from './helper/format-datepicker';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ConnexionComponent} from './connexion/connexion.component';
import {AddTerrainsComponent} from './terrains/add-terrains/add-terrains.component';
import {ListeTerrainsComponent} from './terrains/liste-terrains/liste-terrains.component';
import {DetailTerrainComponent} from './terrains/detail-terrain/detail-terrain.component';
import {ModalTerrainsComponent} from './terrains/modal-terrains/modal-terrains.component';
import {ModifImageComponent} from './terrains/modif-image/modif-image.component';
import {TerrainsComponent} from './terrains/terrains/terrains.component';
import {UpdateTerrainsComponent} from './terrains/update-terrains/update-terrains.component';
import {UpdateDetailComponent} from './terrains/update-detail/update-detail.component';
import {VoirDetailComponent} from './terrains/voir-detail/voir-detail.component';
import {AddMaisonComponent} from './maison/add-maison/add-maison.component';
import {DetailMaisonComponent} from './maison/detail-maison/detail-maison.component';
import {ListeMaisonComponent} from './maison/liste-maison/liste-maison.component';
import {ModalMaisonComponent} from './maison/modal-maison/modal-maison.component';
import {ModifImageMAisonComponent} from './maison/modif-image-maison/modif-image-maison.component';
import {UpadateMaisonComponent} from './maison/upadate-maison/upadate-maison.component';
import {UpdateDetailMaisonComponent} from './maison/update-detail-maison/update-detail-maison.component';
import {VoirDetailMaisonComponent} from './maison/voir-detail-maison/voir-detail-maison.component';
import {DefaultModule} from './layouts/default/default.module';
import {AddVilleComponent} from './villes/add-ville/add-ville.component';
import {ListeVilleComponent} from './villes/liste-ville/liste-ville.component';
import {UpdateVilleComponent} from './villes/update-ville/update-ville.component';
import {VillesComponent} from './villes/villes/villes.component';
import {AddFlashMaisonComponent} from './flashMaison/add-flash-maison/add-flash-maison.component';
import {ListFlashMaisonComponent} from './flashMaison/list-flash-maison/list-flash-maison.component';
import {UpdateFlashMaisonComponent} from './flashMaison/update-flash-maison/update-flash-maison.component';
import {VoirFlashMaisonComponent} from './flashMaison/voir-flash-maison/voir-flash-maison.component';
import {DetailFlashMaisonComponent} from './flashMaison/detail-flash-maison/detail-flash-maison.component';
import {AddFlashTerrainComponent} from './flashTerrain/add-flash-terrain/add-flash-terrain.component';
import {ListFlashTerrainComponent} from './flashTerrain/list-flash-terrain/list-flash-terrain.component';
import {UpdateFlashTerrainComponent} from './flashTerrain/update-flash-terrain/update-flash-terrain.component';
import {ImageAccueilComponent} from './accueil/image-accueil/image-accueil.component';
import {ImageAccueilImmoComponent} from './accueilimmo/image-accueil-immo/image-accueil-immo.component';
import {BlogsComponent} from './blogs/blogs/blogs.component';
import {AddClientComponent} from './client/add-client/add-client.component';
import {ListClientComponent} from './client/list-client/list-client.component';
import {UpdateClientComponent} from './client/update-client/update-client.component';
import {DemandeSelectComponent} from './demande/demande-select/demande-select.component';
import {ListeDemandeComponent} from './demande/liste-demande/liste-demande.component';
import {ListeDemandeLuComponent} from './demande/liste-demande-lu/liste-demande-lu.component';
import {AddDepComponent} from './departement/add-dep/add-dep.component';
import {ListDepComponent} from './departement/list-dep/list-dep.component';
import {AddEmplComponent} from './employe/add-empl/add-empl.component';
import {ListEmplComponent} from './employe/list-empl/list-empl.component';
import {ProduitAGeolocaliseComponent} from './produit-ageolocalise/produit-ageolocalise.component';
import {ProduitVenduComponent} from './produit-vendu/produit-vendu.component';
import {ListProgrammeComponent} from './programme/list-programme/list-programme.component';
import {AddProduitComponent} from './produitVendu/add-produit/add-produit.component';
import {AddProduitAGeoComponent} from './produitAGeolocaliser/add-produit-ageo/add-produit-ageo.component';
import {ListProduitAGeoComponent} from './produitAGeolocaliser/list-produit-ageo/list-produit-ageo.component';
import {ListProduitVenduComponent} from './produitVendu/list-produit-vendu/list-produit-vendu.component';
import {UpdateCoordComponent} from './produitVendu/update-coord/update-coord.component';
import {VenteFlashComponent} from './vente/vente-flash/vente-flash.component';
import {SharedModule} from './shared/shared.module';
import {UpdateProduitVenduComponent} from './produitVendu/update-produit-vendu/update-produit-vendu.component';
import { AddImageAccueilComponent } from './accueil/add-image-accueil/add-image-accueil.component';
import { ListImageAccueilComponent } from './accueil/list-image-accueil/list-image-accueil.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AddTerrainsComponent,
    DetailTerrainComponent,
    ListeTerrainsComponent,
    ModalTerrainsComponent,
    ModifImageComponent,
    TerrainsComponent,
    UpdateTerrainsComponent,
    UpdateDetailComponent,
    VoirDetailComponent,
    AddMaisonComponent,
    DetailMaisonComponent,
    ListeMaisonComponent,
    ModalMaisonComponent,
    ModifImageMAisonComponent,
    UpadateMaisonComponent,
    UpdateDetailMaisonComponent,
    VoirDetailMaisonComponent,
    AddVilleComponent,
    ListeVilleComponent,
    UpdateVilleComponent,
    VillesComponent,
    AddFlashMaisonComponent,
    ListFlashMaisonComponent,
    DetailFlashMaisonComponent,
    UpdateFlashMaisonComponent,
    VoirFlashMaisonComponent,
    AddFlashTerrainComponent,
    ListFlashTerrainComponent,
    UpdateFlashTerrainComponent,
    ImageAccueilComponent,
    ImageAccueilImmoComponent,
    BlogsComponent,
    AddClientComponent,
    ListClientComponent,
    UpdateClientComponent,
    DemandeSelectComponent,
    ListeDemandeComponent,
    ListeDemandeLuComponent,
    AddDepComponent,
    ListDepComponent,
    AddEmplComponent,
    ListEmplComponent,
    AddProduitAGeoComponent,
    ListProduitAGeoComponent,
    ProduitAGeolocaliseComponent,
    ProduitVenduComponent,
    UpdateProduitVenduComponent,
    ListProduitVenduComponent,
    UpdateCoordComponent,
    AddProduitComponent,
    ListProgrammeComponent,
    VenteFlashComponent,
    AddImageAccueilComponent,
    ListImageAccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    DefaultModule,
    SharedModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    RxStompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
