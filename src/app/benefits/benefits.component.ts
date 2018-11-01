import { Component, OnInit, Input } from '@angular/core';

import { User } from '../models/user.model';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  constructor() { }

  @Input()
  user: User;

  ngOnInit() {
  }

}
