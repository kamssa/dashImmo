import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Document} from '../../models/Document';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Admin} from '../../models/Admin';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddDocComponent} from '../add-doc/add-doc.component';
import {UpdateDocComponent} from '../update-doc/update-doc.component';
import {DocumentService} from '../../service/document.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AdminService} from '../../service/admin.service';
import {ModalDocComponent} from '../modal-doc/modal-doc.component';

@Component({
  selector: 'app-liste-doc',
  templateUrl: './liste-doc.component.html',
  styleUrls: ['./liste-doc.component.scss']
})
export class ListeDocComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'update', 'delete'];
  dataSource: MatTableDataSource<Document>;
  documents: Document[];
  document: Document;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private categorieService: DocumentService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.categorieService.getAllDocument().subscribe(data => {
      this.documents = data.body;
      this.documents.forEach(value => {
        let opp : Document = value;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Document>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        this.admin = res.body;
        this.roles = res.body.roles;
        console.log(this.roles);
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = this.ROLE_ADMIN.name;
          console.log(this.ROLE_ADMIN);
        });
      });

    }
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDocComponent, {
      width: '650px',
      data: this.document
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.document = result;
      this.receptacle.unshift(this.document);
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Document>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(UpdateDocComponent,{
      data: {
        document: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.document = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Document>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  redirectToDelete(id: any) {
    if (this.ROLE_NAME === 'ROLE_ADMIN'){

      this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.categorieService.supprimerDocument(id).subscribe(data => {
            this._snackBar.open('Succès de l\'opération!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
          });

        }
      });

    }else {
      console.log('vous netes pas authorisé');
    }
  }

  openDescription(id: any): void {
    console.log(id);
    const dialogRef = this.dialog.open(ModalDocComponent, {
      data: {
        document: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.document = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Document>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  refresh() {
    this.categorieService.getAllDocument().subscribe(data => {
      this.documents = data.body;
      this.documents.forEach(value => {
        let opp : Document = value;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Document>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
