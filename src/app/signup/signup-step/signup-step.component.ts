import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup-step',
  templateUrl: './signup-step.component.html',
  styleUrls: ['./signup-step.component.scss']
})
export class SignupStepComponent implements OnInit {

  constructor() { }

  @Input()
  data: object = {};

  @Input()
  limit = 1;

  @Input()
  headline: string;

  @Input()
  text: string;

  @Input()
  description: string;

  @Input()
  section: string;

  @Input()
  pagingText: string;

  @Input()
  buttonClass: string;

  @Input()
  submitBtnText: string;

  @Input()
  tertiaryBtnText: string;

  @Input()
  selectHandler: Function;

  @Input()
  skipHandler: Function;

  @Input()
  disabledHandler: Function;

  @Input()
  loadingHandler: Function;

  @Input()
  index: number;

  @Input()
  type: string;

  ngOnInit() {
  }

}
