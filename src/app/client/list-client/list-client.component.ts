import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from '../../models/Client';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Admin} from '../../models/Admin';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ClientService} from '../../service/client.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UpdateClientComponent} from '../update-client/update-client.component';
import {AddClientComponent} from '../add-client/add-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'email', 'telephone', 'update', 'delete'];
  dataSource: MatTableDataSource<Client>;
  clients: Client[];
  client: Client;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private clientService: ClientService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.clientService.getAllClient().subscribe(data => {
      this.clients = data.body;
      console.log('clients', data.body);
      this.clients.forEach(value => {
        let opp : Client = value;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Client>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '650px',
      data: this.client
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.client = result;
      this.receptacle.unshift(this.client);
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Client>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(UpdateClientComponent,{
      data: {
        client: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.client = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Client>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  redirectToDelete(id: any) {

    if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      console.log(' Dans la navbar', decoded);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {

        this.admin = res.body;
        this.roles = res.body.roles;
        console.log(this.roles);
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;

        });
      });

    }
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.clientService.deleteClientById(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: 'top',

          });
        });
        this.router.navigate(['membre']);

      }
    });
  }

}
