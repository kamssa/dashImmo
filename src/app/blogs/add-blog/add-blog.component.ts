import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {BlogService} from '../../service/blog.service';
import {Blog} from '../../models/Blog';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup;
  blogId: number;
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;
  message = '';

  blog: Blog;
  selected: string;
  checks =  false;
  constructor(private  fb: FormBuilder, private blogService: BlogService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddBlogComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.initForm();
  }
  initForm(): void{

    this.blogForm = this.fb.group({
      libelle: ['', Validators.required],
      description: [''],
    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  onSubmit(): void {
    let formValue = this.blogForm.value;
    let blog: Blog = {
      libelle : formValue.libelle,
      description : formValue.description,
      path: this.selectedFiles.item(0).name,
      im : this.checks,

    };

    console.log('Voir les infos du blog ', blog);
    this.blogService.ajoutBlog(blog).subscribe(data => {
      console.log('blog enregistre avec succes', data);
      this.blogId = data.body.id;
      this.blog = data.body;
      console.log(this.blogId);
      if (this.blogId) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('multipartFile', this.currentFile);
        console.log('formdata', formData);
        this.blogService.uploadImageAccueil(formData, this.blogId).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);

            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Le fichier ne peut etre archivé !';
            this.currentFile = undefined;
          });
        this.selectedFiles = undefined;
      }

    }, err => {
      console.log('échec operation');
    });
    this.router.navigate(['/listBlog']);
  }

  chec(ev) {
  this.checks = ev.target.checked;
  console.log(this.checks);
  }
}
