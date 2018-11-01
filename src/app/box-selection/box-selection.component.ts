import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { Globals } from '../config/globals';
import { User } from '../models/user.model';
import { RecurlyService } from '../services/recurly.service';
import { BoxService } from '../services/box.service';
import { BoxItem } from '../models/box-item.model';

@Component({
  selector: 'app-box-selection',
  templateUrl: './box-selection.component.html',
  styleUrls: ['./box-selection.component.scss']
})
export class BoxSelectionComponent implements OnInit {

  constructor(
    private globals: Globals,
    private boxService: BoxService,
    private recurlyService: RecurlyService
  ) { }

  @Input()
  showHeadline = true;

  @Input()
  showGetStarted = true;

  @Input()
  btnText = 'Get the Box';

  @Input()
  onSelection: Function;

  @Input()
  user: User;
  
  @Input()
  colClass?: string = 'span4';

  assetUrl = this.globals.assetUrl;

  boxItems = [];
  plans = [];

  ngOnInit() {
    this.getBoxItems();
    this.getPlans();
  }

  getPlans() {
    this.recurlyService.getPlans({})
      .subscribe(plans => {
        this.plans = this.normalizeData(plans.plans.plan);
      });
  }

  getBoxItems() {
    this.boxService.getBoxes().
      subscribe(boxItems => {
        this.boxItems = boxItems[0].list;
      });
  }

  getBox(budget) {
    return _.find(this.boxItems, { budget });
  }

  normalizeData(plans) {
    // get a set of unique plan budgets
    const uniqueBudgets = _.uniqBy(plans, 'unit_amount_in_cents.USD._');

    const budgets = _.map(uniqueBudgets, plan => {
      plan['amount_in_cents'] = parseInt(plan['unit_amount_in_cents']['USD']['_'], 10);
      const box = this.getBox(plan['amount_in_cents']);
      plan['box'] = box;

      return plan;
    });

    const featured = _.filter(budgets, plan => plan['box']['featured']);

    return _.orderBy(featured, ['amount_in_cents'], ['asc']);
  }
}
