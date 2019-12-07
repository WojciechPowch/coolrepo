import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login-page/login.service';
import { Router } from '@angular/router';
import { RoutingStatusService } from './routing-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  public showActions: boolean = true;
  private routingEventChangesObserver: Subscription;

  constructor(private loginService: LoginService,
              private router: Router,
              private routingStatusService: RoutingStatusService) { }

  ngOnInit() {
    this.subscribeRoutingStatusChanged();
    this.checkCurrentRoute();
  }

  ngOnDestroy() {
    this.routingEventChangesObserver.unsubscribe();
  }

  public logOut(): void {
    this.loginService.provideLogoutAction().subscribe(
      result => {
        this.router.navigate(['loginadmin']);
      },
      error => {
        this.router.navigate(['loginadmin'])
      }
    )
  }

  public navigateToPostEditor(): void {
    this.routingStatusService.actionChanged();
    this.router.navigate(['adminpanel/posteditor']);
  }

  private subscribeRoutingStatusChanged(): void {
    this.routingEventChangesObserver = this.routingStatusService.adminPanelRoutingEvent.subscribe(
      value => {
        this.showActions = value;
      }
    )
  }

  private checkCurrentRoute(): void {
    this.showActions = this.router.url === '/adminpanel/postslist';
  }

}
