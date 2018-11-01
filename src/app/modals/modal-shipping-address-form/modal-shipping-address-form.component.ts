import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ShippingAddressFormComponent } from '../../shipping-address-form/shipping-address-form.component';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-modal-shipping-address-form',
  templateUrl: './modal-shipping-address-form.component.html',
  styleUrls: ['./modal-shipping-address-form.component.scss']
})
export class ModalShippingAddressFormComponent implements OnInit {

  @ViewChild(ShippingAddressFormComponent) shippingAddressForm: ShippingAddressFormComponent;

  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  address: Address;

  @Input()
  mode = 'edit';

  ngOnInit() {
  }

}
