import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { Globals } from '../config/globals';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private globals: Globals
  ) { }

  currentUser: User;

  accountRoot = {
    title: 'My Account',
    link: '/account'
  };

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
      });
  }

}
