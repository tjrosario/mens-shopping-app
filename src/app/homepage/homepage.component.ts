import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../models/user.model';
import { Globals } from '../config/globals';
import { environment } from '../../environments/environment';

import { ModalPromoComponent } from '../modals/modal-promo/modal-promo.component';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private globals: Globals,
    private modalService: NgbModal,
    private eventTrackingService: EventTrackingService
  ) {
    /*
    this.metaService.updateTag({
      content: 'Sign up for free. Fill out your profile with sizing, style, budget and the brands you like. Configure your subscription and get amazing clothes from awesome brands, effortlessly. Free shipping and free exchanges. One free bonus item and one eco-friendly brand in every order!'
    },
     "name='description'"
    );*/
  }

  facebookAppId = `${environment.facebook.app.appId}`;

  facebookPageId = `${environment.facebook.pageId}`;

  currentUser: User;

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User, coupon: {} }) => {
        this.currentUser = data.currentUser;

        if (data.coupon) {
          this.showPromoModal(data.coupon);
        }
      });
  }

  showPromoModal(coupon) {
    const modalRef = this.modalService.open(ModalPromoComponent);
    modalRef.componentInstance.coupon = coupon;
    modalRef.componentInstance.user = this.currentUser;
  }

  trackGuest() {
    this.eventTrackingService.trackEvent({
      action: 'Homepage Hero Call to Action Click',
      category: 'Call to Action',
      label: 'Get Started'
    });
  }

  trackCustomer() {
    this.eventTrackingService.trackEvent({
      action: 'Homepage Hero Call to Action Click',
      category: 'Call to Action',
      label: 'Place Order'
    });
  }
}
