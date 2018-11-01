import { Component, OnInit, Input } from '@angular/core';

import { User } from '../models/user.model';
import { Globals } from '../config/globals';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  constructor(
    private globals: Globals
  ) { }

  @Input()
  user: User;

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
  }


}
