import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DocumentService} from '../../service/document.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Document} from '../../models/Document';

@Component({
  selector: 'app-update-doc',
  templateUrl: './update-doc.component.html',
  styleUrls: ['./update-doc.component.scss']
})
export class UpdateDocComponent implements OnInit {
  document: Document;
  updateDocForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private categorieService: DocumentService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Document,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateDocComponent>) { }

  ngOnInit(): void {
    this.categorieService.getDocumentById(this.data['document'])
      .subscribe(res => {
        console.log(res.body);
        this.document = res.body;
        this.updateDocForm = this.fb.group({
          id: this.document.id,
          version: this.document.version ,
          libelle: this.document.libelle,
          description: this.document.description
        });
      });
  }

  onSubmit() {
    let formValue = this.updateDocForm.value;

    this.document = this.updateDocForm.value;
    this.categorieService.modifDocument(this.document).subscribe(data => {
      if (data){
        this.document = data.body;
        this.dialogRef.close(this.document);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.updateDocForm.reset();
  }
}
