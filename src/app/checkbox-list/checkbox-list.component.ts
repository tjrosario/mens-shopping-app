import { Component, OnInit, Input, HostListener } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent implements OnInit {

  constructor() { }

  @Input()
  data: object = {};

  @Input()
  limit = 1;

  @Input()
  labelField = 'name';

  @Input()
  type: string;

  @Input()
  onCheck: string;

  @Input()
  hasMedia = false;

  @HostListener('click', ['$event.target'])
  onClick(target) {
    const checked = _.filter(this.data['list'], item => {
      return item['checked'];
    });

    let sorted;

    if (checked) {
      if (this.limit !== null) {
        sorted = _.sortBy(checked, 'updated');

        if (sorted.length > this.limit) {
          if (this.limit > 1) {
            _.first(sorted)['checked'] = false;
            _.last(sorted)['checked'] = true;
          } else {
            _.first(sorted)['checked'] = false;
          }
        }

        this.data['selected'] = sorted;
      }
    }
  }

  ngOnInit() {

  }
}
