import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm = new FormGroup({
    loginField: new FormControl(),
    passwordField: new FormControl()
  })

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  public login(): void {
    let login: string = this.getLoginValue();
    let password: string = this.getPasswordValue();
    this.service.provideLoginAction(login, password).subscribe(
      (data) => {
        
      },
      (error) => {

      }
    )
  }

  private getLoginValue(): string {
    let controls = this.loginForm.controls;
    let loginFieldControl = controls.loginField;
    return loginFieldControl.value;
  }

  private getPasswordValue(): string {
    let controls = this.loginForm.controls;
    let passwordFieldControl = controls.passwordField;
    return passwordFieldControl.value;
  }

}
