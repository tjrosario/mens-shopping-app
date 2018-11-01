import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CreditCardFormComponent } from '../../credit-card-form/credit-card-form.component';
import { CreditCard } from '../../models/credit-card.model';

@Component({
  selector: 'app-modal-credit-card-form',
  templateUrl: './modal-credit-card-form.component.html',
  styleUrls: ['./modal-credit-card-form.component.scss']
})
export class ModalCreditCardFormComponent implements OnInit {

  @ViewChild(CreditCardFormComponent) creditCardForm: CreditCardFormComponent;

  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  card: CreditCard;

  @Input()
  mode = 'edit';

  ngOnInit() {
  }

}
