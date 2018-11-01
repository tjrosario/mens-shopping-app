import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSimpleComponent } from '../modals/modal-simple/modal-simple.component';

import * as _ from 'lodash';

import { Globals } from '../config/globals';
import { TeamMember } from '../models/team-member.model';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {

  constructor(
    private globals: Globals,
    private modalService: NgbModal
  ) { }

  @Input()
  member: TeamMember;

  assetUrl = this.globals.assetUrl;

  ngOnInit() {
  }

  viewBio(member) {
    const modalRef = this.modalService.open(ModalSimpleComponent);

    const photo = `<img src="${this.assetUrl}${member.imageUrl}" alt="${member.name}, ${member.title}">`;

    let bio = '';

    _.each(member.bio, para => {
      bio += `<p>${para}</p>`;
    });

    const template = `<div class="row"><div class="span3">${photo}</div><div class="span9">${bio}</div></div>`;

    modalRef.componentInstance.config = {
      title: `${member.name}, <small>${member.title}</small>`,
      submitLabel: 'Ok'
    };

    modalRef.componentInstance.content = template;
    modalRef.componentInstance.className = 'modal-team';
  }
}
