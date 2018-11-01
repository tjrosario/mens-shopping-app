import { Component, OnInit, Input, Inject } from '@angular/core';

import { FacebookService } from '../services/facebook.service';
import { UtilsService } from '../services/utils.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-facebook-page',
  templateUrl: './facebook-page.component.html',
  styleUrls: ['./facebook-page.component.scss']
})
export class FacebookPageComponent implements OnInit {

  constructor(
    private facebookService: FacebookService,
    private utilsService: UtilsService
  ) { }

  data: object = {};

  @Input()
  appId: string;

  @Input()
  pageId: string;

  @Input()
  user: User;

  ngOnInit() {
    if (this.utilsService.isBrowser()) {
      const facebookConfig = {
        params: {
          client_id: this.appId,
          redirect_uri: window.location.host,
          grant_type: 'client_credentials'
        }
      };

      this.facebookService.accessToken({ config: facebookConfig })
        .subscribe(resp => {
          const accessToken = resp.access_token;

          if (accessToken) {
            const pageConfig = {
              params: {
                access_token: accessToken,
                fields: 'name,likes'
              }
            };

            this.facebookService.page({ id: this.pageId, config: pageConfig })
                .subscribe(respPage => {
                    this.data = respPage;
                });
            }
        });
    }
  }

}
