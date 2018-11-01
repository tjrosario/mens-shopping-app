import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { 
    const content = 'Our subscription plans are simple, easy and flexible. You choose the budget, the frequency (monthly, bi-monthly or every three months) and you can pause, skip or cancel at any time. We also show you a preview of what\'s coming in case you want to make an edit, cancel or swap something before we ship.';

    this.utilsService.setMetaTags([
      {
        name: 'description',
        content
      },
      {
        property: 'og:description',
        content
      },
      {
        name: 'twitter:description',
        content
      }
    ]);
  }

  currentUser: User;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
      });
  }

}
