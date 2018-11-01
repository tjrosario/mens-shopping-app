import { Component, OnInit, Input } from '@angular/core';

import { Globals } from '../../config/globals';

@Component({
  selector: 'app-referral-candy-post-purchase',
  templateUrl: './post-purchase.component.html',
  styleUrls: ['./post-purchase.component.scss']
})
export class PostPurchaseComponent implements OnInit {

  constructor(
    private globals: Globals
  ) { }

  assetUrl = this.globals.assetUrl;


  @Input()
  fname: string;

  @Input()
  lname: string;

  @Input()
  email: string = "service@mythreadlab.com";

  @Input()
  id: string = "khna2v4jq1gdaj5n42864akyv";

  ngOnInit() {

  }

}
