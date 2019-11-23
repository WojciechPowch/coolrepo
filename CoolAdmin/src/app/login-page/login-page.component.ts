import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { IsiServiceService } from '../isi-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm = new FormGroup({
    loginField: new FormControl('', [Validators.required]),
    passwordField: new FormControl('', [Validators.required])
  })

  constructor(private service: LoginService,
              public dialog: MatDialog,
              private isiService: IsiServiceService,
              private router: Router) { }

  ngOnInit() {
  }

  public login(): void {
    let login: string = this.getLoginValue();
    let password: string = this.getPasswordValue();
    this.service.provideLoginAction(login, password).subscribe(
      (data) => {
        if (data.success) {
          this.isiService.setIsi(data.isi)
          this.router.navigate(['adminpanel'])
        } else {
          this.openErrorDialogWindow(data.message);
        }
      },
      (error) => {
        this.openErrorDialogWindow('Something goig wrong, try reload page :)');
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

  private openErrorDialogWindow(message: string): void {
    this.dialog.open(DialogWindowComponent, {
      width: '250px',
      data: {
        message: message
      }
    })
  }

  private getLoginFieldErrorMessage(): string {
    return this.loginForm.controls.loginField.hasError('required') ? 'Login field is required!' : 'Wrong value!';
  }
  
  private getPasswordFieldErrorMessage(): string {
    return this.loginForm.controls.loginField.hasError('required') ? 'Password field is required!' : 'Wrong value!';
  }
}
