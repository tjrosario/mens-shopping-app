import { Component, OnInit, Input } from '@angular/core';

import { Box } from '../models/box.model';

@Component({
  selector: 'app-box-description',
  templateUrl: './box-description.component.html',
  styleUrls: ['./box-description.component.scss']
})
export class BoxDescriptionComponent implements OnInit {

  constructor() { }

  @Input()
  data: Box;

  ngOnInit() {
  }

}
