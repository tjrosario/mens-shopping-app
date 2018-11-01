import { Component, OnInit, Input } from '@angular/core';

import { User } from '../models/user.model';

@Component({
  selector: 'app-personal-shopper',
  templateUrl: './personal-shopper.component.html',
  styleUrls: ['./personal-shopper.component.scss']
})
export class PersonalShopperComponent implements OnInit {

  constructor() { }

  @Input()
  user: User;

  ngOnInit() {
  }

}
