import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  test() {
  this.router.navigate(['document']);
  }
}
