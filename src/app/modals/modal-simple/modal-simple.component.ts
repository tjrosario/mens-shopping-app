import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

@Component({
  selector: 'app-modal-simple',
  templateUrl: './modal-simple.component.html',
  styleUrls: ['./modal-simple.component.scss']
})
export class ModalSimpleComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  config = {};

  @Input()
  content: string;

  @Input()
  className: string;

  ngOnInit() {
    this.config['title'] = this.config['title'] || 'Confirm';
    this.config['submitLabel'] = this.config['submitLabel'] || 'Submit';
  }

}
