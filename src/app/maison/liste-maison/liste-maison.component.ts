import {Component, OnInit, ViewChild} from '@angular/core';



@Component({
  selector: 'app-liste-maison',
  templateUrl: './liste-maison.component.html',
  styleUrls: ['./liste-maison.component.scss']
})
export class ListeMaisonComponent  {
  /*displayedColumns: string[] = ['nomComplet', 'email', 'telephone','fonction','preocupation','satisfait', 'actions'];
  listData: MatTableDataSource<any>;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  array: any;
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private terrainService: TerrainService,
              public dialog: MatDialog,
              private notificationService: NotificationService,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.terrainService.getAllProspect().subscribe(list => {
      console.log('Voir les prospects',list.body);
      if(list.status === 0){
        this.array = list.body.map(item => {
          return {
            id: item.id,
            ...item
          };
        });
      }else{
        console.log('aucune donnée');
      }

      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };

      });
    if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        this.admin = res.body;
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = this.ROLE_ADMIN.name;
        });
      });

    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    this.terrainService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddTerrainsComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      this.prospectService.prospectCreer$
      .subscribe(result => {
           console.log(result.body);
           this.array.unshift(result.body);
          this.array = this.array;
          this.listData = new MatTableDataSource(this.array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;

          });
     });
  }

  onEdit(row){
    this.prospectService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
     const dialogRef = this.dialog.open(AddTerrainsComponent, dialogConfig);

     dialogRef.afterClosed().subscribe(result => {
      this.prospectService.prospectModif$
      .subscribe(result => {
        const index: number = this.array.indexOf(row);
       if (index !== -1) {
          this.array[index] = result.body;
          this.listData = new MatTableDataSource(this.array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;

      }
      });
     });
  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer le prospect ?')){
      this.terrainService.deleteProspectById(row.id).subscribe(result => {
        console.log(result);
      });
      this.notificationService.warn('Suppression avec succès');

    }
    const index: number = this.array.indexOf(row);
    if (index !== -1) {
      this.array.splice(index, 1);
      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

  }
  }
*/
}
