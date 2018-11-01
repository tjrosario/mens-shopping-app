import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { RecurlyService } from '../../../services/recurly.service';
import { BoxService } from '../../../services/box.service';
import { Globals } from '../../../config/globals';
import { User } from '../../../models/user.model';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-account-subscriptions-confirmation',
  templateUrl: './account-subscriptions-confirmation.component.html',
  styleUrls: ['./account-subscriptions-confirmation.component.scss']
})
export class AccountSubscriptionsConfirmationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private recurlyService: RecurlyService,
    private boxService: BoxService,
    private globals: Globals,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  assetUrl = this.globals.assetUrl;
  currentUser: User;

  boxItems = [];
  subscription = null;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getBoxItems();
      });
  }

  getBoxItems() {
    this.boxService.getBoxes().
      subscribe(boxItems => {
        this.boxItems = boxItems[0].list;
        this.getSubscription();
      });
  }

  getSubscription() {
  	const uuid = this.route.snapshot.paramMap.get('uuid');

  	this.recurlyService.getSubscription({ uuid })
      .subscribe(
        subscription => {
        	this.subscription = subscription.subscription;
        	this.subscription = this.normalizeData(this.subscription);

          console.log(this.subscription);
        },
        error => {
          this.router.navigate(['/account', 'subscriptions']);
        });
  }

  getBox(budget) {
    return _.find(this.boxItems, { budget: parseInt(budget, 10) });
  }

  normalizeData(subscription) {
    const { plan } = subscription;
    const { plan_code } = plan;
    const split = plan_code.split('_');
    const intervalLength = split[1];
    const unit = split[2];
  	const box = this.getBox(subscription['unit_amount_in_cents']['_']);
  	subscription['box'] = box;

    const p = {
      plan_interval_length: { _: intervalLength },
      plan_interval_unit: unit
    };

    const formattedInterval = this.utilsService.getFormattedInterval(p);

    subscription['plan_interval_display_string'] = formattedInterval['displayString'];

    return subscription;
	}
}
