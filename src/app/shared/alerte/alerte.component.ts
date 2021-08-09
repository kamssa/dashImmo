import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlerteService} from '../alerte.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: ['./alerte.component.scss']
})
export class AlerteComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlerteService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
