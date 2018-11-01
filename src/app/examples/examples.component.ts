import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Globals } from '../config/globals';
import { BoxService } from '../services/box.service';
import { BoxItem } from '../models/box-item.model';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

  constructor(
    private boxService: BoxService,
    private globals: Globals,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
    const content = 'Our service will introduce you to new brands, styles and looks that you never knew you\'d like. We source from small independent brands, sustainable eco-friendly brands, established apparel manufacturers and retail malls. We offer casual wear, business casual wear and active wear.';

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

  boxItems: BoxItem[];

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
      });
    this.getBoxItems();
  }

  getBoxItems() {
    this.boxService.getBoxes().
      subscribe(boxItems => {
        this.boxItems = boxItems;
      });
  }

}
