import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gift-card-form',
  templateUrl: './gift-card-form.component.html',
  styleUrls: ['./gift-card-form.component.scss']
})
export class GiftCardFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  @Input()
  onSubmit: Function;

  @Input()
  isDisabled: boolean;

  giftCardForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.giftCardForm = this.fb.group({
      'code': ['', [
        Validators.required,
        Validators.minLength(24),
        Validators.maxLength(29)
      ]],
    });
  }

}
