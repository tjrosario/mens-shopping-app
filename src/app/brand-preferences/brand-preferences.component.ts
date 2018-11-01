import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Globals } from '../config/globals';
import { User } from '../models/user.model';

@Component({
  selector: 'app-brand-preferences',
  templateUrl: './brand-preferences.component.html',
  styleUrls: ['./brand-preferences.component.scss']
})
export class BrandPreferencesComponent implements OnInit {

  constructor(
    private globals: Globals,
    private route: ActivatedRoute
  ) { }

  assetUrl = this.globals.assetUrl;

  currentUser: User;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
      });
  }

}
