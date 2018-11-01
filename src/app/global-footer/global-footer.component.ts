import { Component, OnInit, Input } from '@angular/core';

import { NavSection } from '../models/nav-section.model';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-global-footer',
  templateUrl: './global-footer.component.html',
  styleUrls: ['./global-footer.component.scss']
})
export class GlobalFooterComponent implements OnInit {

  @Input()
  sections: NavSection[];

  today = Date.now();

  footerCategory = 'Footer';
  footerNavAction = 'Footer Nav Click';

  constructor() { }

  ngOnInit() {
  }

}
