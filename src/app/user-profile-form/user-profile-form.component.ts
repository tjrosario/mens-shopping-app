import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Height } from '../models/height.model';
import { HeightService } from '../services/height.service';
import { Globals } from '../config/globals';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  constructor(
  	private fb: FormBuilder,
  	private heightService: HeightService,
    private globals: Globals
  ) { }

  @Input()
  user?: User = {};

  @Input()
  onSubmit: Function;

  @Input()
  loading?: boolean = false;

  @Input()
  fbLoading?: boolean = false;

  @Input()
  fbLink?: boolean = false;

  @Input()
  resetPassword?: boolean = false;

  heights: Height[];
  profileForm: FormGroup;

  masks = this.globals.masks;

  ngOnInit() {
    this.getHeights();
    this.createForm();
  }

  getHeights() {
    this.heightService.getHeights()
      .subscribe(heights => this.heights = heights);
  }

  createForm() {
  	const data = this.user;

    this.profileForm = this.fb.group({
      'firstName': [data['firstName'], Validators.required],
      'lastName': [data['lastName'], Validators.required],
      'statedHeight': [data['statedHeight'], Validators.required],
      'statedWeight': [data['statedWeight'], Validators.required],
      'phone': [data['phone'], Validators.required],
      'email': [{ value: data['email'], disabled: true }, [
        Validators.required,
        Validators.email
      ]],
    });
  }
}
