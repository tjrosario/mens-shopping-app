import { Component, OnInit, Input } from '@angular/core';

import { Globals } from '../config/globals';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss']
})
export class ToggleBtnComponent implements OnInit {

  constructor(
    private globals: Globals
  ) { }

  assetUrl = this.globals.assetUrl;

  @Input()
  label: string;

  @Input()
  data: object = {};

  @Input()
  hasMedia = false;

  @Input()
  buttonClass: string;

  ngOnInit() {
    if (this.label) {
      this.buttonClass = this.label.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase();
    }
  }

  check() {
    if (!this.data['checked']) {
      this.data['updated'] = Date.now();
    }

    this.data['checked'] = !this.data['checked'];
  }

}
