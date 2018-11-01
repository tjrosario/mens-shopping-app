import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recurly-coupon-form',
  templateUrl: './recurly-coupon-form.component.html',
  styleUrls: ['./recurly-coupon-form.component.scss']
})
export class RecurlyCouponFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  @Input()
  onSubmit: Function;

  @Input()
  isDisabled: boolean;

  couponForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.couponForm = this.fb.group({
      'coupon_code': ['', [
        Validators.required
      ]],
    });
  }

}
