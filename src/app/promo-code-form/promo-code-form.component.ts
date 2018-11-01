import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-promo-code-form',
  templateUrl: './promo-code-form.component.html',
  styleUrls: ['./promo-code-form.component.scss']
})
export class PromoCodeFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  @Input()
  onSubmit: Function;

  @Input()
  isDisabled: boolean;

  promoForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  isFormValid() {
    return this.promoForm.value['promoCode'] !== '';
  }

  createForm() {
    this.promoForm = this.fb.group({
      'promoCode': ['']
    });
  }
}
