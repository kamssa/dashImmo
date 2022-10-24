import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {PostsComponent} from '../../modules/posts/posts.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {ErrorDialogComponent} from '../../service/shared/dialogs/error-dialog/error-dialog.component';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {MatConfirmDialogComponent} from '../../service/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import {AddDocComponent} from '../../documents/add-doc/add-doc.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListeDocComponent} from '../../documents/liste-doc/liste-doc.component';
import {AddTerrainsComponent} from '../../terrains/add-terrains/add-terrains.component';
import {ListeTerrainsComponent} from '../../terrains/liste-terrains/liste-terrains.component';
import {AddMaisonComponent} from '../../maison/add-maison/add-maison.component';
import {ListeMaisonComponent} from '../../maison/liste-maison/liste-maison.component';

import {AddVilleComponent} from '../../villes/add-ville/add-ville.component';
import {BlogsComponent} from '../../blogs/blogs/blogs.component';
import {AddClientComponent} from '../../client/add-client/add-client.component';
import {ListClientComponent} from '../../client/list-client/list-client.component';
import {DemandeSelectComponent} from '../../demande/demande-select/demande-select.component';
import {ListeDemandeComponent} from '../../demande/liste-demande/liste-demande.component';
import {ListeDemandeLuComponent} from '../../demande/liste-demande-lu/liste-demande-lu.component';
import {AddDepComponent} from '../../departement/add-dep/add-dep.component';
import {ListDepComponent} from '../../departement/list-dep/list-dep.component';
import {AddEmplComponent} from '../../employe/add-empl/add-empl.component';
import {ListEmplComponent} from '../../employe/list-empl/list-empl.component';
import {AddProduitAGeoComponent} from '../../produitAGeolocaliser/add-produit-ageo/add-produit-ageo.component';
import {ListProduitAGeoComponent} from '../../produitAGeolocaliser/list-produit-ageo/list-produit-ageo.component';
import {UpdateProduitVenduComponent} from '../../produitVendu/update-produit-vendu/update-produit-vendu.component';
import {ListProduitVenduComponent} from '../../produitVendu/list-produit-vendu/list-produit-vendu.component';
import {UpdateCoordComponent} from '../../produitVendu/update-coord/update-coord.component';
import {AddProduitComponent} from '../../produitVendu/add-produit/add-produit.component';
import {ListProgrammeComponent} from '../../programme/list-programme/list-programme.component';
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
import {Ng2TelInputModule} from 'ng2-tel-input';
import { UpdateVersementComponent } from 'src/app/versement/update-versement/update-versement.component';
import {CoordonnesComponent} from '../../produitAGeolocaliser/coordonnes/coordonnes.component';
import { AddProspectComponent } from '../../prospect/add-prospect/add-prospect.component';
import { ListProspectComponent } from '../../prospect/list-prospect/list-prospect.component';
import { ModalProspectComponent } from '../../prospect/modal-prospect/modal-prospect.component';
import { FileUploadComponent } from 'src/app/file-upload/file-upload.component';




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
        ListeTerrainsComponent,
        AddMaisonComponent,
        ListeMaisonComponent,
        AddVilleComponent,
        BlogsComponent,
        AddClientComponent,
        ListClientComponent,
        DemandeSelectComponent,
        ListeDemandeComponent,
        ListeDemandeLuComponent,
        AddDepComponent,
        ListDepComponent,
        AddEmplComponent,
        ListEmplComponent,
        AddProduitAGeoComponent,
        ListProduitAGeoComponent,
        UpdateProduitVenduComponent,
        ListProduitVenduComponent,
        UpdateCoordComponent,
        AddProduitComponent,
        ListProgrammeComponent,
        AddImageAccueilComponent,
        ListImageAccueilComponent,
        ConnexionComponent,
        ListeVilleComponent,
        AddBlogComponent,
        ListBlogComponent,
        UpdateBlogComponent,
        AddVersementComponent,
        ListVersementComponent,
        VersementComponent,
        UpdateVersementComponent,
        CoordonnesComponent,
        AddProspectComponent,
        ListProspectComponent,
        ModalProspectComponent,
        FileUploadComponent
    ],
    exports: [
        FileUploadComponent
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
        Ng2TelInputModule

    ]
})
export class DefaultModule { }
