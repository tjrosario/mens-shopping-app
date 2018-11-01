import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamMember } from '../models/team-member.model';
import { TeamService } from '../services/team.service';

import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
    const content = 'We started ThreadLab because we wanted an easier and faster way to discover awesome clothes from quality brands without having to go shopping in stores or browse online. We\'ve made it our mission to support and help build awareness for eco-friendly and sustainable brands- companies that care about the environment and make awesome gear in a responsible way. We hope you love the service and love supporting companies that want to improve the world around us.';

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

  team: TeamMember[];

  currentUser: User;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
      });

    this.getTeamMembers();
  }

  getTeamMembers() {
    this.teamService.getTeamMembers()
      .subscribe(team => {
        this.team = team;
      });
  }

}
