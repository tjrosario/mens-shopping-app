import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StatesService } from '../services/states.service';
import { State } from '../models/state.model';
import { Globals } from '../config/globals';
import { Address } from '../models/address.model';


@Component({
  selector: 'app-shipping-address-form',
  templateUrl: './shipping-address-form.component.html',
  styleUrls: ['./shipping-address-form.component.scss']
})
export class ShippingAddressFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private statesService: StatesService,
    private globals: Globals
  ) {}

  @Input()
  data?: Address = {};

  @Input()
  mode = 'edit';

  @Input()
  onSubmit?: Function;

  @Input()
  onCancel?: Function;

  @Input()
  loading?: boolean = false;

  @Input()
  disabled?: boolean = false;

  @Input()
  showActions?: boolean = false;

  masks = this.globals.masks;

  shippingForm: FormGroup;

  states: State[];

  ngOnInit() {
    this.getStates();
    this.createForm();
  }

  createForm() {
    const data = this.data;

    data['isDefault'] = data['isDefault'] || false;
    data['addressLine2'] = data['addressLine2'] || '';

    this.shippingForm = this.fb.group({
      'addresseeFirstName': [data['addresseeFirstName'], Validators.required],
      'addresseeLastName': [data['addresseeLastName'], Validators.required],
      'addressLine1': [data['addressLine1'], Validators.required],
      'addressLine2': [data['addressLine2']],
      'city': [data['city'], Validators.required],
      'state': [data['state'], Validators.required],
      'zip': [data['zip'], [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('[0-9]*')
      ]],
      'addresseePhone': [data['addresseePhone'], Validators.required],
      /*
      'addresseeEmail': [data['addresseeEmail'], [
        Validators.required,
        Validators.email
      ]],*/
      'type': ['shipping'],
      'isDefault': [data['isDefault']]
    });
  }

  getStates() {
    this.statesService.getStates()
      .subscribe(states => this.states = states);
  }

  onFormSubmit() {
    if (this.onSubmit) {
      this.onSubmit(this.shippingForm);
    }
  }
}
