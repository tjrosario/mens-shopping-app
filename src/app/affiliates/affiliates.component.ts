import { Component, OnInit } from '@angular/core';

import { Globals } from '../config/globals';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss']
})
export class AffiliatesComponent implements OnInit {

  constructor(
    private globals: Globals,
    private utilsService: UtilsService
  ) {
    const content = 'If you\'d like to earn commission dollars helping spread the word about TheadLab, sign up here. We\'ll provide you with your own affiliate link to share with your network. For every sale you generate, you\'ll receive a cash payout to your account! Thanks for helping us spread the word about ThreadLab!';

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

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
  }

}
