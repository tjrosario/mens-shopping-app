import { Component, OnInit } from '@angular/core';

import { FaqItem } from '../models/faq-item.model';
import { FaqService } from '../services/faq.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor(
    private faqService: FaqService,
    private utilsService: UtilsService
  ) {
    const content = 'Have a question? Check out our ever growing list of Frequently Asked Questions. Have a question that you think should be included in our FAQ? Shoot us an email and tell us about it. We\'ll update our FAQ as soon as possible. Email us if you can\'t find your answer and we\'ll reply super fast to help you out!';

    this.utilsService.setMetaTags([
      {
        name: 'description',
        content
      },
      {
        property: 'og:description',
        content
      },
      {
        name: 'twitter:description',
        content
      }
    ]);
  }

  faqs: FaqItem[];

  ngOnInit() {
    this.getFAQs();
  }

  getFAQs() {
    this.faqService.getFAQs()
      .subscribe(faqs => {
        this.faqs = faqs;
      });
  }

}
