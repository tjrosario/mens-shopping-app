import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from '@ngx-utils/cookies';

import { Coupon } from '../../models/coupon.model';
import { User } from '../../models/user.model';
import { Globals } from '../../config/globals';

@Component({
  selector: 'app-modal-promo',
  templateUrl: './modal-promo.component.html',
  styleUrls: ['./modal-promo.component.scss']
})
export class ModalPromoComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private cookiesService: CookiesService,
    private globals: Globals
  ) {}

  @Input()
  coupon: Coupon;

  @Input()
  user: User;

  promoValid = false;
  promoPending = false;
  promoExpired = false;

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
    if (this.coupon.state ==='redeemable') {
      this.cookiesService.remove('promoCode');
      this.cookiesService.put('promoCode', this.coupon.coupon_code);
      this.promoValid = true;
    }
  }

  cancel() {
    this.cookiesService.remove('promoCode');
    this.activeModal.dismiss();
  }

}
