import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {PostsComponent} from '../../modules/posts/posts.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TerrainsComponent} from '../../terrains/terrains.component';
import {RouterModule} from '@angular/router';
import {ErrorDialogComponent} from '../../service/shared/dialogs/error-dialog/error-dialog.component';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {MatConfirmDialogComponent} from '../../service/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import {AddDocComponent} from '../../documents/add-doc/add-doc.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListeDocComponent} from '../../documents/liste-doc/liste-doc.component';
import {AddTerrainsComponent} from '../../terrains/add-terrains/add-terrains.component';
import {DetailTerrainComponent} from '../../terrains/detail-terrain/detail-terrain.component';
import {ListeTerrainsComponent} from '../../terrains/liste-terrains/liste-terrains.component';
import {ModalTerrainsComponent} from '../../terrains/modal-terrains/modal-terrains.component';
import {ModifImageComponent} from '../../terrains/modif-image/modif-image.component';
import {UpdateTerrainsComponent} from '../../terrains/update-terrains/update-terrains.component';
import {UpdateDetailComponent} from '../../terrains/update-detail/update-detail.component';
import {VoirDetailComponent} from '../../terrains/voir-detail/voir-detail.component';
import {AddMaisonComponent} from '../../maison/add-maison/add-maison.component';
import {DetailMaisonComponent} from '../../maison/detail-maison/detail-maison.component';
import {ListeMaisonComponent} from '../../maison/liste-maison/liste-maison.component';
import {ModalMaisonComponent} from '../../maison/modal-maison/modal-maison.component';
import {ModifImageMAisonComponent} from '../../maison/modif-image-maison/modif-image-maison.component';
import {UpadateMaisonComponent} from '../../maison/upadate-maison/upadate-maison.component';
import {UpdateDetailMaisonComponent} from '../../maison/update-detail-maison/update-detail-maison.component';
import {VoirDetailMaisonComponent} from '../../maison/voir-detail-maison/voir-detail-maison.component';
import {AddVilleComponent} from '../../villes/add-ville/add-ville.component';
import {AddFlashMaisonComponent} from '../../flashMaison/add-flash-maison/add-flash-maison.component';
import {ListFlashMaisonComponent} from '../../flashMaison/list-flash-maison/list-flash-maison.component';
import {DetailFlashMaisonComponent} from '../../flashMaison/detail-flash-maison/detail-flash-maison.component';
import {UpdateFlashMaisonComponent} from '../../flashMaison/update-flash-maison/update-flash-maison.component';
import {VoirFlashMaisonComponent} from '../../flashMaison/voir-flash-maison/voir-flash-maison.component';
import {AddFlashTerrainComponent} from '../../flashTerrain/add-flash-terrain/add-flash-terrain.component';
import {ListFlashTerrainComponent} from '../../flashTerrain/list-flash-terrain/list-flash-terrain.component';
import {UpdateFlashTerrainComponent} from '../../flashTerrain/update-flash-terrain/update-flash-terrain.component';
import {BlogsComponent} from '../../blogs/blogs/blogs.component';
import {AddClientComponent} from '../../client/add-client/add-client.component';
import {ListClientComponent} from '../../client/list-client/list-client.component';
import {UpdateClientComponent} from '../../client/update-client/update-client.component';
import {DemandeSelectComponent} from '../../demande/demande-select/demande-select.component';
import {ListeDemandeComponent} from '../../demande/liste-demande/liste-demande.component';
import {ListeDemandeLuComponent} from '../../demande/liste-demande-lu/liste-demande-lu.component';
import {AddDepComponent} from '../../departement/add-dep/add-dep.component';
import {ListDepComponent} from '../../departement/list-dep/list-dep.component';
import {AddEmplComponent} from '../../employe/add-empl/add-empl.component';
import {ListEmplComponent} from '../../employe/list-empl/list-empl.component';
import {AddProduitAGeoComponent} from '../../produitAGeolocaliser/add-produit-ageo/add-produit-ageo.component';
import {ListProduitAGeoComponent} from '../../produitAGeolocaliser/list-produit-ageo/list-produit-ageo.component';
import {ProduitAGeolocaliseComponent} from '../../produit-ageolocalise/produit-ageolocalise.component';
import {ProduitVenduComponent} from '../../produit-vendu/produit-vendu.component';
import {UpdateProduitVenduComponent} from '../../produitVendu/update-produit-vendu/update-produit-vendu.component';
import {ListProduitVenduComponent} from '../../produitVendu/list-produit-vendu/list-produit-vendu.component';
import {UpdateCoordComponent} from '../../produitVendu/update-coord/update-coord.component';
import {AddProduitComponent} from '../../produitVendu/add-produit/add-produit.component';
import {ListProgrammeComponent} from '../../programme/list-programme/list-programme.component';
import {VenteFlashComponent} from '../../vente/vente-flash/vente-flash.component';
import {AddImageAccueilComponent} from '../../accueil/add-image-accueil/add-image-accueil.component';
import {ListImageAccueilComponent} from '../../accueil/list-image-accueil/list-image-accueil.component';
import {ConnexionComponent} from '../../connexion/connexion.component';
import {ListeVilleComponent} from '../../villes/liste-ville/liste-ville.component';
import {AddBlogComponent} from '../../blogs/add-blog/add-blog.component';
import {ListBlogComponent} from '../../blogs/list-blog/list-blog.component';
import {UpdateBlogComponent} from '../../blogs/update-blog/update-blog.component';
import { AddVersementComponent } from 'src/app/versement/add-versement/add-versement.component';
import { ListVersementComponent } from 'src/app/versement/list-versement/list-versement.component';
import { VersementComponent } from 'src/app/versement/versement/versement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    MatConfirmDialogComponent,
    AddDocComponent,
    ListeDocComponent,
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
    AddFlashMaisonComponent,
    ListFlashMaisonComponent,
    DetailFlashMaisonComponent,
    UpdateFlashMaisonComponent,
    VoirFlashMaisonComponent,
    AddFlashTerrainComponent,
    ListFlashTerrainComponent,
    UpdateFlashTerrainComponent,
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
    ConnexionComponent,
    ListeVilleComponent,
    AddBlogComponent,
    ListBlogComponent,
    UpdateBlogComponent,
    AddVersementComponent,
    ListVersementComponent,
    VersementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ]
})
export class DefaultModule { }
