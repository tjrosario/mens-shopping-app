import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { Subscription } from '../models/subscription.model';
import { Budget } from '../models/budget.model';
import { Frequency } from '../models/frequency.model';
import { Status } from '../models/status.model';
import { FREQUENCIES, BUDGETS, STATUSES } from '../data/subscriptions';

const now = new Date();

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) {}

  @Input()
  data?: Subscription = {};

  @Input()
  mode = 'edit';

  subscriptionForm: FormGroup;

  budgets: Budget[];

  frequencies: Frequency[];

  statuses: Status[];

  startDate: NgbDateStruct;

  today = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate() 
  }

  minDate = this.today;

  ngOnInit() {
    this.getBudgets();
    this.getFrequencies();
    this.getStatuses();
    this.createForm();
  }

  getBudgets() {
    this.budgets = BUDGETS;
  }

  getFrequencies() {
    this.frequencies = _.filter(FREQUENCIES, { enabled: true });
  }

  getStatuses() {
    this.statuses = STATUSES;
  }

  createForm() {
    const data = this.data;
    const mode = this.mode;

    const current = _.cloneDeep(data);

    if (data.startDate) {
      const date = new Date(data.startDate);
      this.startDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate() 
      };

      this.minDate = this.startDate;
    }

    let fbGroup = {
      'budget': [data['budget'], Validators.required],
      'frequency': [data['frequency'], Validators.required],
      'startDate': [this.startDate, Validators.required],
      'notes': [data['notes']],
      'subscritionNumber': [data['subscritionNumber']],
      'current': [current]
    };

    /*
    if (mode === 'edit') {
      fbGroup['status'] = [data['status'], Validators.required];
    }*/

    this.subscriptionForm = this.fb.group(fbGroup);
  }

  onSubmit() {}
}
