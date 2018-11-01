import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
    const content = 'Sign up for free. Fill out your profile with sizing, style, budget and the brands you like. Configure your subscription and get amazing clothes from awesome brands, effortlessly. Free shipping and free exchanges. One free bonus item and one eco-friendly brand in every order!';

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
