import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalSimpleComponent } from '../../modals/modal-simple/modal-simple.component';

@Component({
  selector: 'app-order-financials',
  templateUrl: './order-financials.component.html',
  styleUrls: ['./order-financials.component.scss']
})
export class OrderFinancialsComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  @Input()
  data: {};

  showBreakdown = false;

  ngOnInit() {
  }

  openOverfilled() {
    const modalRef = this.modalService.open(ModalSimpleComponent);
    const template = '<p>Because we want to send you the right stuff, we occasionally over pack our boxes and exceed your budget. We don\'t think it\'s fair to charge you more when this happens, so we simply absorb the additional cost ourselves.</p><p>Consider it a gift from us to you!</p>';

    modalRef.componentInstance.config = {
      title: 'Why Don\'t I Owe Anything?',
      submitLabel: 'Ok'
    };

    modalRef.componentInstance.content = template;
  }

  openUnderfilled(status) {
    const modalRef = this.modalService.open(ModalSimpleComponent);
    let template = '';

    if (status === 'cancelled') {
      template = '<p>You\'re getting a refund because you decided to cancel your order.  You will be refunded the original cost of the box.</p>';
    } else {
      template = '<p>You\'re getting a refund because the value of the items in your order is less than than your chosen budget. This may be because you rejected some items from your order preview or because we under-filled your box to stay within your budget.</p><p>Your refund is the difference between what you paid and what the order is currently worth.</p>';
    }

    modalRef.componentInstance.config = {
      title: 'Why Am I Getting a Refund?',
      submitLabel: 'Ok'
    };

    modalRef.componentInstance.content = template;
  }

  toggleBreakdown() {
    this.showBreakdown = !this.showBreakdown;
  }
}
