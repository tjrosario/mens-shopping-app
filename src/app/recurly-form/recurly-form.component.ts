import { Component, OnInit, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Globals } from '../config/globals';
import { User } from '../models/user.model';

declare const recurly: any;

@Component({
  selector: 'app-recurly-form',
  templateUrl: './recurly-form.component.html',
  styleUrls: ['./recurly-form.component.scss']
})
export class RecurlyFormComponent implements OnInit, AfterViewChecked {

  constructor(
    private globals: Globals
  ) { }

	@ViewChild('recurlyForm')
	public recurlyForm: NgForm;

  @Input()
  data?: object;

  @Input()
  onSubmit?: Function;

  @Input()
  onCancel?: Function;

  @Input()
  loading?: boolean = false;

  @Input()
  disabled?: boolean = false;

  @Input()
  newCustomer?: boolean = false;

  ngOnInit() {
    this.data = this.data || {};
    this.data['first_name'] = this.data['first_name'] || '';
    this.data['last_name'] = this.data['last_name'] || '';
  }

  ngAfterViewChecked() {
    //if (!recurly.configured) {
      recurly.configure(this.globals.recurly);
    //}
  }

  onFormSubmit(form, $event) {
  	recurly.token(form.value, (err, token) => {
  		if (this.onSubmit) {
  			this.onSubmit(err, token);
  		}
  	});
  }
}
