import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-password-request-form',
  templateUrl: './reset-password-request-form.component.html',
  styleUrls: ['./reset-password-request-form.component.scss']
})
export class ResetPasswordRequestFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {}

  resetPasswordRequestForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resetPasswordRequestForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  onSubmit() {
  }
}
