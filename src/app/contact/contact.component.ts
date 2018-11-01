import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ContactSubject } from '../models/contact-subject.model';
import { ContactService } from '../services/contact.service';
import { UtilsService } from '../services/utils.service';
import { MailService } from '../services/mail.service';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user.model';
import { Globals } from '../config/globals';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private fb: FormBuilder,
    private globals: Globals,
    private utilsService: UtilsService,
    private mailService: MailService,
    private notificationService: NotificationService
  ) {
    const content = 'Contact us for help with your account or any questions on how ThreadLab works. We\'re available via email, chat, phone or social media. We\'re always around to help and we\'ll usually respond within 8 business hours, if not sooner. If you need help on a weekend or holiday, email is the fastest way to contact us.';

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

  subjects: ContactSubject[];

  contactForm: FormGroup;

  currentUser: User;

  address = this.globals.companyAddress;

  loading = false;

  createForm() {
    let data = {};

    if (this.currentUser) {
      data = {
        name: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
        email: this.currentUser.email
      };
    }

    this.contactForm = this.fb.group({
      'name': [data['name'] || '', Validators.required],
      'email': [data['email'] || '', [
        Validators.required,
        Validators.email
      ]],
      'subject': ['', Validators.required],
      'message': ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;

    const subject = this.contactForm.value['subject'];
  
    const toEmail = _.find(this.subjects, { title: subject })['email'];

    const data = {
      from: this.contactForm.value['email'],
      to: toEmail,
      subject: `ThreadLab Contact Form Submission: ${subject}`,
      html: this.contactForm.value['message']
    };

    this.mailService.contact({ data })
      .subscribe(message => {
        this.notificationService.success('Thank you for your message. Someone from our team will be in touch shortly.');
        this.loading = false;
      });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.createForm();
      });
    this.getSubjects();
  }

  getSubjects() {
    this.contactService.getSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }
}
