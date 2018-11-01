import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from '../services/customer.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private notificationService: NotificationService
  ) {}

  resetPasswordForm: FormGroup;

  loading = false;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resetPasswordForm = this.fb.group({
      'password': ['', [
        Validators.required,
        Validators.minLength(7)
      ]],
    });
  }

  onSubmit() {
  	this.loading = true;

  	const params = this.resetPasswordForm.value;
  	params['id'] = this.route.snapshot.paramMap.get('id');

    const config = {
    	params
    };

    this.customerService.updatePassword({ config })
      .subscribe(user => {
      	this.notificationService.success('Password updated.');
        this.loading = false;
      });
  }
}
