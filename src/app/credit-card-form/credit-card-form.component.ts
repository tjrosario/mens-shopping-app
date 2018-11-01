import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';

import * as _ from 'lodash';

import { UtilsService } from '../services/utils.service';
import { CreditCard } from '../models/credit-card.model';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  @Input()
  data: CreditCard = {};

  @Input()
  mode = 'edit';

  billingForm: FormGroup;

  cardBrand = null;

  ngOnInit() {
    this.createForm();
  }

  onKeyUp(event) {
    const value = event.target.value;
    this.cardBrand = this.utilsService.getCreditCardType(value).toLowerCase();
  }

  createForm() {
    const data = this.data;

    this.billingForm = this.fb.group({
      'name': [data['name'], Validators.required],
      'number': [data['number'], [<any>CreditCardValidator.validateCCNumber]],
      'expirationDate': [data['expirationDate'], [<any>CreditCardValidator.validateExpDate]],
      'cvc': [data['cvc'], [
        <any>Validators.required, 
        <any>Validators.minLength(3), 
        <any>Validators.maxLength(4)
      ]],
      'isDefault': [data['isDefault']]
    });
  }

  isFormValid() {
    const formValue = this.billingForm.value;

    if (this.mode === 'add') {
      return !_.isEmpty(formValue['name']) &&
        !_.isEmpty(formValue['number']) &&
        !_.isEmpty(formValue['expirationDate']) &&
        !_.isEmpty(formValue['cvc']);
    } else {
      return !_.isEmpty(formValue['name']) &&
        !_.isEmpty(formValue['expirationDate']);
    }
  }

  onSubmit() {
  }
}
