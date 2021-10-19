import {Component, Inject, OnInit} from '@angular/core';
import {Document} from '../../models/Document';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MyErrorStateMatcher} from '../../helper/MyErrorStateMatcher';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DocumentService} from '../../service/document.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {NotificationService} from '../../helper/notification.service';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.scss']
})
export class AddDocComponent implements OnInit {
  docForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;

  error = '';

  constructor(public fb: FormBuilder,
              public  documentService: DocumentService,
              private location: Location,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddDocComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {
    this.documentService.getAllDocument().subscribe(dat => {

    });

  }


  // convenience getter for easy access to form fields

  onSubmit(): void{
    if (this.documentService.form.valid) {
    if (!this.documentService.form.get('id').value){
      this.documentService.ajoutDocument(this.documentService.form.value).subscribe(res =>{
      if(res.status === 0){
        this.notificationService.success('Document ajouté avec succès');
      }
      });

      }
    else{
      this.documentService.modifDocument(this.documentService.form.value).subscribe(result => {
        console.log(result.status);
      });
      this.documentService.form.reset();
      this.documentService.initializeFormGroup();
      this.notificationService.success('Document modifié avec succès');
    }
    this.onClose();

  }
  }

  onClose() {
    this.documentService.form.reset();
    this.documentService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.documentService.form.reset();
    this.documentService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
}
