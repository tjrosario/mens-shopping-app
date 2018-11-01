import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SubscriptionFormComponent } from '../../subscription-form/subscription-form.component';
import { Subscription } from '../../models/subscription.model';

@Component({
  selector: 'app-modal-subscription-form',
  templateUrl: './modal-subscription-form.component.html',
  styleUrls: ['./modal-subscription-form.component.scss']
})
export class ModalSubscriptionFormComponent implements OnInit {

  @ViewChild(SubscriptionFormComponent) subscriptionForm: SubscriptionFormComponent;

  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  subscription: Subscription;

  @Input()
  mode = 'edit';

  ngOnInit() {
  }

}
