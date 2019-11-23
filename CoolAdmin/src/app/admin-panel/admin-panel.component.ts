import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-page/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
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

}
