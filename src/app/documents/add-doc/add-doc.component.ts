import {Component, Inject, OnInit} from '@angular/core';
import {Document} from '../../models/Document';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MyErrorStateMatcher} from '../../helper/MyErrorStateMatcher';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DocumentService} from '../../service/document.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

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
  matcher = new MyErrorStateMatcher();
  libelle = new FormControl('',
    [Validators.required] );
  description = new FormControl('');
  error = '';

  constructor(public fb: FormBuilder,
              private  documentService: DocumentService,
              private location: Location,
              public dialogRef: MatDialogRef<AddDocComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }

  ngOnInit(): void {
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }

  initForm() {
    this.docForm = this.fb.group({
      libelle: new FormControl('',[Validators.required] ),
      description: new FormControl(''),
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.docForm.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.docForm.controls[controlName].hasError(errorName);
  }
  public createCategorie = (createCategorieFormValue) => {
    console.log('voir info', this.docForm.value);
    if (this.docForm.valid) {
      this.onSubmit(createCategorieFormValue);
    }
  }

  onSubmit(createCategorieFormValue): void{
    console.log('voir les valeurs assignés', createCategorieFormValue.value);
    let  document: Document = {
      libelle: createCategorieFormValue.libelle,
      description: createCategorieFormValue.description,
    };
    this.documentService.ajoutDocument(document).subscribe(data => {
        this.categorie = data.body;

        if (data.status === 0){
          this.dialogRef.close(this.categorie);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }else {
          this.error = data.messages[0];
          console.log( data.messages);
        }

      }, error => {
        this.error = error;
        console.log(this.error);

      }
    );
    this.router.navigate(['document']);
  }
}
