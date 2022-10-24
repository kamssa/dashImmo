import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-image-accueil',
  templateUrl: './add-image-accueil.component.html',
  styleUrls: ['./add-image-accueil.component.scss']
})
export class AddImageAccueilComponent implements OnInit {
  imageForm: FormGroup;
  imageAccueilId: number;
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;
  message = '';


  selected: string;
  constructor(
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddImageAccueilComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.initForm();
  }
  ngAfterViewInit(): void {


  }

  initForm(): void{


  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
    console.log('Voir le ichier selectionne', this.selectedFile);
  }
  onSubmit(): void {

  }
}
