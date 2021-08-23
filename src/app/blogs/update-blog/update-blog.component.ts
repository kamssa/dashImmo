import {Component, Inject, OnInit} from '@angular/core';
import {Document} from '../../models/Document';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DocumentService} from '../../service/document.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BlogService} from '../../service/blog.service';
import {Blog} from '../../models/Blog';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {
  blog: Blog;
  updateBlockForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private blogService: BlogService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Document,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateBlogComponent>) { }

  ngOnInit(): void {
    this.blogService.getBlogById(this.data['blog'])
      .subscribe(res => {
        console.log(res.body);
        this.blog = res.body;
        this.updateBlockForm = this.fb.group({
          id: this.blog.id,
          version: this.blog.version ,
          libelle: this.blog.libelle,
          description: this.blog.description,
          path: this.blog.path
        });
      });
  }

  onSubmit() {
    let formValue = this.updateBlockForm.value;

    this.blog = this.updateBlockForm.value;
    this.blogService.modifBlog(this.blog).subscribe(data => {
      if (data){
        this.blog = data.body;
        this.dialogRef.close(this.blog);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.updateBlockForm.reset();
  }

}
