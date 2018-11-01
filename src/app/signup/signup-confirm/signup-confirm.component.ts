import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Globals } from '../../config/globals';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.scss']
})
export class SignupConfirmComponent implements OnInit {

  constructor(
    private globals: Globals,
    private authService: AuthService
  ) { }

  currentUser: User;

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

}
