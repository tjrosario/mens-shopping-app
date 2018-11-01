import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user.model';
import { Globals } from '../../config/globals';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private globals: Globals,
    private router: Router
  ) { }

  currentUser: User;
  assetUrl = this.globals.assetUrl;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
      });
  }

  goToSubscriptions() {
    this.router.navigate(['/account/subscriptions']);
  }

}
