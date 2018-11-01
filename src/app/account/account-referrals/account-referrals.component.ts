import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Globals } from '../../config/globals';
import { WINDOW } from "../../services/window.service";

@Component({
  selector: 'app-account-referrals',
  templateUrl: './account-referrals.component.html',
  styleUrls: ['./account-referrals.component.scss']
})
export class AccountReferralsComponent implements OnInit {

  constructor(
    private globals: Globals,
    public sanitizer: DomSanitizer,
    @Inject(WINDOW) public window: Window
  ) { }

  campaignUrl = this.globals.referrals.campaign.url;
  campaignUrlSafe: SafeResourceUrl

  ngOnInit() {
    this.campaignUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.campaignUrl);
  }

}
