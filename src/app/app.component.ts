import { Component, OnInit, AfterViewChecked, ViewContainerRef, Inject, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { DOCUMENT, Location, PopStateEvent } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PageScrollConfig } from 'ngx-page-scroll';

import { Title, Meta } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


import { Globals } from './config/globals';
import { NavSection } from './models/nav-section.model';
import { NavItem } from './models/nav-item.model';
import { NavigationService } from './services/navigation.service';
import { UtilsService } from './services/utils.service';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { EventTrackingService } from './services/event-tracking.service';


declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  assetUrl = this.globals.assetUrl;
  currentUser: User;
  fixedNavSections: NavSection[];
  footerNavSections: NavSection[];
  userNavItems: NavItem[];
  userAccountNavItems: NavItem[];
  isMenuOpen = false;
  isAccountMenuOpen = false;
  footerActive = true;

  headerCategory = 'Header';
  mobileNavAction = 'Mobile Nav Click';

  previousUrl: string;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private globals: Globals,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private navigationService: NavigationService,
    private authService: AuthService,
    private utilsService: UtilsService,
    public toastr: ToastsManager,
    private eventTrackingService: EventTrackingService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    vcr: ViewContainerRef
  ) {
    this.utilsService.setMetaTags();

    this.toastr.setRootViewContainerRef(vcr);

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.router.events.subscribe((event: Event) => this.handleRouterEvents(event));

    PageScrollConfig.defaultScrollOffset = 100;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    };
    PageScrollConfig.defaultDuration = 0;
  }

  ngOnInit() {
    // this.checkCurrentUser();

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        this.metaService.updateTag({
          content: event['title']
        },
          'property="og:title"'
        );
        this.metaService.updateTag({
          content: event['title']
        },
          'property="og:title"'
        );
        this.metaService.updateTag({
          content: event['title']
        },
          'name="twitter:title"'
        );
      });
  }

  ngAfterViewChecked() {
    if (window['dataLayer']) {
      window['dataLayer'].push({'event': 'optimize.activate'});
    }
  }

  trackAccountNav(navItem) {
    this.eventTrackingService.trackEvent({
      action: 'Account Nav Click',
      category: 'Header',
      label: navItem.name
    });
  }

  trackAccountNavLogout() {
    this.eventTrackingService.trackEvent({
      action: 'Account Nav Logout Click',
      category: 'Header',
      label: 'Logout'
    });
  }

  trackFixedNav(navItem) {
    this.eventTrackingService.trackEvent({
      action: 'Mobile Nav Click',
      category: 'Header',
      label: navItem.name
    });
  }

  trackFixedNavLogout() {
    this.eventTrackingService.trackEvent({
      action: 'Mobile Nav Logout Click',
      category: 'Header',
      label: 'Logout'
    });
  }

  trackFixedNavLogin() {
    this.eventTrackingService.trackEvent({
      action: 'Mobile Nav Login Click',
      category: 'Header',
      label: 'Login'
    });
  }

  checkCurrentUser() {
    const isAuthenticated = this.isAuthenticated();

    if (isAuthenticated) {
      this.onUserAuthenticated();
    } else {
      this.onUserUnauthenticated();
    }
  }

  isAdmin() {
    return this.authService.getCurrentUserRole() === 'admin';
  }

  onUserAuthenticated() {
    this.currentUser = this.authService.getCurrentUser();

    this.navigationService.getUserMemberEntities()
      .subscribe(navItems => {
        if (!this.isAdmin()) {
          navItems = navItems.filter((item) => !item.admin); 
        }

        this.userNavItems = navItems;
      });

    this.navigationService.getGlobalEntities()
      .subscribe(navSections => {
        this.footerNavSections = navSections;
      });

    this.navigationService.getAccountEntities()
      .subscribe(navItems => {
        if (!this.isAdmin()) {
          navItems = navItems.filter((item) => !item.admin); 
        }
        
        this.userAccountNavItems = navItems;
      });
  }

  onUserUnauthenticated() {
    this.currentUser = this.authService.getCurrentUser();

    this.navigationService.getUserGuestEntities()
      .subscribe(navItems => {
        this.userNavItems = navItems;
      });

    this.navigationService.getGlobalEntities()
      .subscribe(navSections => {
        this.fixedNavSections = navSections;
        this.footerNavSections = navSections;
      });

    this.userAccountNavItems = null;
  }

  handleRouterEvents(event: Event) {
    if (event instanceof NavigationStart) {
      if (event.url !== this.lastPoppedUrl) {
        if (this.utilsService.isBrowser()) {
          this.yScrollStack.push(window.scrollY);
        }
      }

      this.authService.setAttemptUrl(event.url);

      this.checkMenu();
      this.checkCurrentUser();

      const isCheckout = event.url.indexOf('place-order') > -1 && event.url.indexOf('confirmation') === -1;
      
      if (isCheckout) {
        this.footerActive = false;
      } else {
        this.footerActive = true;
      }

      if (this.previousUrl) {
        const className = this.previousUrl.replace(/\//g, '-');
        this.renderer.removeClass(this.document.body, className);
      }
      let currentUrlSlug = event.url.slice(1)
      if (currentUrlSlug) {
        const className = currentUrlSlug.replace(/\//g, '-');
        this.renderer.addClass(this.document.body, className);
      }
      this.previousUrl = currentUrlSlug;
    }

    if (event instanceof NavigationEnd) {
      if (event.url === this.lastPoppedUrl) {
        this.lastPoppedUrl = undefined;
        if (this.utilsService.isBrowser()) {
          window.scrollTo(0, this.yScrollStack.pop());
        }
       
      } else {
        if (this.utilsService.isBrowser()) {
          window.scrollTo(0, 0);
        }
      }

      setTimeout(() => {
        if (window['gtag']) {
          gtag('config', this.globals.google.GA_TRACKING_ID, {
            'page_path': event.urlAfterRedirects
          });
        }
      }, 100);

      // this.checkCurrentUser();
    }
  }

  isAuthenticated() {
    return Boolean(this.authService.getCurrentUser());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  checkMenu() {
    if (this.isMenuOpen) { this.toggleMenu(); }
    if (this.isAccountMenuOpen) { this.toggleAccountMenu(); }
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.authService.clearUser();
        // this.checkCurrentUser();

        const currentUrl = this.router.url;
        if (currentUrl === '/home') {
          if (this.utilsService.isBrowser()) {
            window.location.reload();
          }
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
