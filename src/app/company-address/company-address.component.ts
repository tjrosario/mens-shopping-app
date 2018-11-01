import { Component, OnInit } from '@angular/core';

import { Globals } from '../config/globals';

@Component({
  selector: 'app-company-address',
  templateUrl: './company-address.component.html',
  styleUrls: ['./company-address.component.scss']
})
export class CompanyAddressComponent implements OnInit {

  constructor(
    private globals: Globals
  ) { }

  address = this.globals.companyAddress;

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
  }

}
