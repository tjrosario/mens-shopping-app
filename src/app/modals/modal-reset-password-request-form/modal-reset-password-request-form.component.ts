import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ResetPasswordRequestFormComponent } from '../../reset-password-request-form/reset-password-request-form.component';

@Component({
  selector: 'app-modal-reset-password-request-form',
  templateUrl: './modal-reset-password-request-form.component.html',
  styleUrls: ['./modal-reset-password-request-form.component.scss']
})
export class ModalResetPasswordRequestFormComponent implements OnInit {

  @ViewChild(ResetPasswordRequestFormComponent) resetPasswordRequestForm: ResetPasswordRequestFormComponent;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
