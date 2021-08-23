import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ImageAccueil} from '../../models/ImageAccueil';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ImageAccueilService} from '../../service/imageAccueil.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AddImageAccueilComponent} from '../../accueil/add-image-accueil/add-image-accueil.component';
import {Blog} from '../../models/Blog';
import {BlogService} from '../../service/blog.service';
import {AddBlogComponent} from '../add-blog/add-blog.component';
import {UpdateDocComponent} from '../../documents/update-doc/update-doc.component';
import {Document} from '../../models/Document';
import {UpdateBlogComponent} from '../update-blog/update-blog.component';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'video', 'image', 'description', 'modifier', 'supprimer'];
  dataSource: MatTableDataSource<Blog>;
  blogs: Blog[];
  blog: Blog;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private blogService: BlogService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.blogService.getAllBlog().subscribe(data => {
      this.blogs = data.body;
      console.log('Voir les images du blog', data.body);
      if (data.body){
        this.blogs.forEach(value => {
          let opp : Blog = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Blog>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBlogComponent, {
      width: '650px',
      data: this.blog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.blog = result;
      if (this.blog){
        this.receptacle.unshift(this.blog);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Blog>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.blogService.supprimerBlog(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });

  }

  redirectToModif(id: any) {
    const dialogRef = this.dialog.open(UpdateBlogComponent,{
      data: {
        blog: id
      }
    });
  }
}
