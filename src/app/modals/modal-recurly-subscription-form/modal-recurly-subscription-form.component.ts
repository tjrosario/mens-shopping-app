import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RecurlySubscriptionFormComponent } from '../../recurly-subscription-form/recurly-subscription-form.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-modal-recurly-subscription-form',
  templateUrl: './modal-recurly-subscription-form.component.html',
  styleUrls: ['./modal-recurly-subscription-form.component.scss']
})
export class ModalRecurlySubscriptionFormComponent implements OnInit {

  @ViewChild(RecurlySubscriptionFormComponent) recurlySubscriptionForm: RecurlySubscriptionFormComponent;

  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  subscription = {};

  @Input()
  billingInfo = {};

  @Input()
  shippingInfo = {};

  @Input()
  shippingAddresses? = [];

  @Input()
  mode = 'edit';

  @Input()
  user: User;

  ngOnInit() {
  }

}
