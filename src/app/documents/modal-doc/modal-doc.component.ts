import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Document} from '../../models/Document';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MyErrorStateMatcher} from '../../helper/MyErrorStateMatcher';
import {DocumentService} from '../../service/document.service';
import {Location} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal-doc',
  templateUrl: './modal-doc.component.html',
  styleUrls: ['./modal-doc.component.scss']
})
export class ModalDocComponent implements OnInit {
  document: Document;
  modalDocForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private categorieService: DocumentService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Document,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<ModalDocComponent>) { }

  ngOnInit(): void {
    this.categorieService.getDocumentById(this.data['document'])
      .subscribe(res => {
        console.log(res.body);
        this.document = res.body;
        this.modalDocForm = this.fb.group({
          id: this.document.id,
          version: this.document.version ,
          libelle: this.document.libelle,
          description: this.document.description
        });
      });
  }

  onSubmit() {
    let formValue = this.modalDocForm.value;

    this.document = this.modalDocForm.value;
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
    this.router.navigateByUrl('/listDoc');
  }
}
